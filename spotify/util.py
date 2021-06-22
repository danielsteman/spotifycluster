from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get
import math
from .machine_learning import TSNE_reduce, KMeans_labeler, MeanShift_labeler, AffinityPropagation_labeler

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

def get_tracks(session_id, url):
    response = execute_spotify_api_request(session_id, url)
    response_dropna = [x for x in response.get('items')]
    track_ids = [track.get('track').get('id') for track in response_dropna]
    artists = [', '.join([artist.get('name') for artist in track.get('track').get('artists')]) for track in response_dropna]
    titles = [track.get('track').get('name') for track in response_dropna]
    features = get_features(session_id, track_ids)
    try:
        next_url = response.get('next')
    except:
        next_url = None
    output = {
        'track_ids': track_ids,
        'artist': artists,
        'title': titles,
        'features': features,
        'next_url': next_url
    }
    return output

def get_labels(session_id, model, features):
    if model == 'K-means':
        labels = KMeans_labeler(features)
    elif model == 'Affinity Propagation':
        labels = AffinityPropagation_labeler(features)
    elif model == 'Mean Shift':
        labels = MeanShift_labeler(features)
    else:
        return print('Model is not included in cluster model module')

    return labels
