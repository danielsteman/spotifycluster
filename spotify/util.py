from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get
import math
from .cluster import KMeans_embedded, TSNE_reduce

BASE_URL = 'https://api.spotify.com/v1'
batch_size = 100

def flat(lst):
    return [item for sublist in lst for item in sublist]

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_token(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type

        # Removed 'refresh_token' for the list of fields to be updated
        tokens.save(update_fields=['access_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)
        return True
    return False

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    # No new refresh token is returned by Spotify; the same refresh token may be used several times
    refresh_token = response.get('refresh_token')

    update_or_create_user_token(session_id, access_token, token_type, expires_in, refresh_token)

def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + tokens.access_token
    }

    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)
    
    response = get(BASE_URL + endpoint, {}, headers=headers)
    try: 
        return response.json()
    except:
        return {'Error': 'Request failed'}

def get_features(session_id, tracks):

    features = [
        'acousticness',
        'danceability',
        'energy',
        'instrumentalness',
        'liveness',
        'loudness',
        'speechiness',
        'tempo',
        'valence'
    ]
    
    parameter = '%2C'.join(tracks)
    endpoint = f'/audio-features?ids={parameter}'
    response = execute_spotify_api_request(session_id, endpoint)
    features_data = response.get('audio_features')
    # filter the values of each feature in the response object
    filtered = [[track[x] for x in features] for track in features_data]
    return filtered

def get_playlist_paginations(session_id, playlist_id):
    endpoint = f'/playlists/{playlist_id}/tracks'
    response = execute_spotify_api_request(session_id, endpoint)
    # Get total number of songs in playlists
    total_tracks = response.get('total')
    # Compute number of iterations based on batch size
    paginations = math.ceil(total_tracks / batch_size)
    return paginations

def get_track_data(response):
    # Songs have an array of one or more artists
    artist = [', '.join([artist.get('name') for artist in track.get('track').get('artists')]) for track in response]
    title = [track.get('track').get('name') for track in response]
    # Zip artist and title in tuples
    data = zip(title, artist)
    return data

def get_track_features_and_titles(session_id, playlist_id):
    n = get_playlist_paginations(session_id, playlist_id)
    features = []
    titles = []
    ids = []
    for i in range(n):
        # get tracks in batches of 100
        next_endpoint = f'/playlists/{playlist_id}/tracks/?offset={i*batch_size}&limit=100'
        response = execute_spotify_api_request(session_id, next_endpoint)
        # filter out tracks without ID (have likely been removed from Spotify)
        response = [x for x in response.get('items') if x.get('track').get('id') != None]
        track_ids = [track.get('track').get('id') for track in response]
        batch_features = get_features(session_id, track_ids)
        title_and_artist = get_track_data(response)

        features.append(batch_features)
        titles.append(title_and_artist)
        ids.append(track_ids)

    features = [item for sublist in features for item in sublist]
    titles = [item for sublist in titles for item in sublist]
    ids = [item for sublist in ids for item in sublist]
    labels = KMeans_embedded(features)
    TSNE_features = TSNE_reduce(features)

    flat_dict = {
        'features': features,
        'titles': titles,
        'ids': ids,
        'labels': labels,
        'TSNE_features': TSNE_features
    }

    return flat_dict

### REVISED FUNCTIONS

def get_tracks(session_id, url):
    response = execute_spotify_api_request(session_id, url)
    response_dropna = [x for x in response.get('items')]
    track_ids = [track.get('track').get('id') for track in response_dropna]
    artists = [', '.join([artist.get('name') for artist in track.get('track').get('artists')]) for track in response_dropna]
    titles = [track.get('track').get('name') for track in response_dropna]
    features = get_features(session_id, track_ids)
    TSNE_features = TSNE_reduce(features)
    try:
        next_url = response.get('next')
    except:
        next_url = None
    output = {
        'track_ids': track_ids,
        'artist': artists,
        'title': titles,
        'features': features,
        'TSNE_features': TSNE_features,
        'next_url': next_url
    }
    return output

def get_track_features(session_id, tracks):
    # number of batches is computed according to defined batch_size
    n = math.ceil(len(tracks)/batch_size)
    features = []
    for i in range(n):
        # index the tracks list to make batches of size batch_size
        track_batch = tracks[batch_size*i:batch_size*i+batch_size]
        features_batch = get_features(session_id, track_batch)
        features.append(features_batch)
    return flat(features)

def get_track_titles(session_id, playlist_id):
    n = get_playlist_paginations(session_id, playlist_id)
    for i in range(n):
        # get tracks in batches of 100
        next_endpoint = f'/playlists/{playlist_id}/tracks/?offset={i*batch_size}&limit=100'
        response = execute_spotify_api_request(session_id, next_endpoint)
        # filter out tracks without ID (have likely been removed from Spotify)
        response = [x for x in response.get('items') if x.get('track').get('id') != None]
        title_and_artist = get_track_data(response)
        titles.append(title_and_artist)
    
    return flat(titles)