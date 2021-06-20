import os
import json
from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID, URL
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *
from .cluster import TSNE_reduce
from django.http import JsonResponse

class AuthURL(APIView):
    def get(self, request, format=None):
        scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

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
        session_id = request.session.session_key
        body = request.body.decode('utf-8')
        features = json.loads(body)
        response = TSNE_reduce(features)

        return Response(response, status=status.HTTP_200_OK)

class getLabels(APIView):
    def post(self, request, format=None):
        session_id = request.session.session_key
        model = request.headers.get('Model')
        body = request.body.decode('utf-8')
        features = json.loads(body)
        response = get_labels(session_id, model, features)
        
        return Response(response, status=status.HTTP_200_OK)

