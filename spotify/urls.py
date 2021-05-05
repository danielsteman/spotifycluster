from django.urls import path 
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('playlists', userPlaylists.as_view()),
    path('user-profile', userProfile.as_view()),
    path('get-tracks-data', getFeatures.as_view()),
    path('get-features', getFeatures.as_view())
]
