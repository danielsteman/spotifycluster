import json
from spotifycluster import settings
from django.shortcuts import redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *
from .machine_learning import PCA_reduce
from spotifycluster.celery import app
from .tasks import TSNE_reduce_async
from django_eventstream import send_event

class AuthURL(APIView):
    def get(self, request, format=None):
        scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'client_id': CLIENT_ID,
            'redirect_uri': REDIRECT_URI,
            'scope': scope,
            'response_type': 'code',
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={  
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': CLIENT_ID,
        'redirect_uri': REDIRECT_URI,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_token(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('/')

class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
        
class userPlaylists(APIView):
    def get(self, request, format=None): 
        session_id = request.session.session_key
        endpoint = '/me/playlists'
        response = execute_spotify_api_request(session_id, endpoint)
        return Response({'playlists': response}, status=status.HTTP_200_OK)

class userProfile(APIView):
    def get(self, request, format=None):
        session_id = request.session.session_key
        endpoint = '/me'
        response = execute_spotify_api_request(session_id, endpoint)
        return Response({'user_profile': response}, status=status.HTTP_200_OK)

class getTrackIds(APIView):
    def get(self, request, format=None):
        session_id = request.session.session_key
        url = request.headers.get('url')
        response = get_tracks(session_id, url)

        return Response(response, status=status.HTTP_200_OK)

class getDimensionReduction(APIView):
    def post(self, request, format=None):
        body = request.body.decode('utf-8')
        features = json.loads(body)
        response = PCA_reduce(features)

        return Response(response, status=status.HTTP_200_OK)

class labelsAsync(APIView):
    def post(self, request):
        model = request.headers.get('Model')
        body = request.body.decode('utf-8')
        features = json.loads(body)
        task_id = start_labels_calculation_task(model, features)
        response = task_id
        
        return Response(response, status=status.HTTP_200_OK)

class dimensionReductionAsync(APIView):
    def post(self, request):

        body_decoded = request.body.decode('utf-8')
        body = json.loads(body_decoded)
        features = body['features']
        
        task = TSNE_reduce_async.delay(features)
        response = task.task_id
                
        return Response(response, status=status.HTTP_200_OK)

class taskStatus(APIView):
    def post(self, request):
        task_id = request.headers.get('taskId')
        if len(task_id) > 0:
            result = app.AsyncResult(id=task_id)
            response = {
                'state': result.state,
                'result': result.result
            }
        elif len(task_id) == 0:
            response = 'no task was initiated'
        else:
            response = 'something went wrong'

        return Response(response, status=status.HTTP_200_OK)

class eventStream(APIView):
    def get(self):
        return send_event('test', 'message', {'text': 'hello world'})
    
class generatePlaylists(APIView):
    def post(self, request):

        """
        1. create N new playlists
        {
            "name": "New Playlist",
            "description": "New playlist description",
            "public": false
        }
        """

        # session_id = request.session.session_key
        # user_id = request.headers.get('user-id')
        # n = request.headers.get('n')
        # name = request.headers.get('new-playlist-name')
        # response = generate_playlists(session_id, user_id, n, name)

        # MOCK RESPONSE
        response = ["7xMDhzkPdvGfJ2yIvOsv4y", "21xheSCZk6yW98nydjr87i", "08uYHrfbs4ApzW1Y3WDnPJ", "1s1MUUOVJXctFpgj7CReMK", "4gFDu1ENwflujFHgi4gRUX"]

        return Response(response, status=status.HTTP_200_OK)

"""
    2. fill playlists with tracks based on label data
    {
        "playlist_id": ,
        "position": 0,
        "uris": 
    }
"""

class fillPlaylist(APIView):
    def post(self, request):

        session_id = request.session.session_key
        playlist_id = request.headers.get('playlist-id')
        uris = request.headers.get('uris')

        response = fill_playlist(session_id, playlist_id, uris)

        return Response(response, status=status.HTTP_200_OK)