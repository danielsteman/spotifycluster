from django.urls import path 
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('playlists', userPlaylists.as_view()),
    path('user-profile', userProfile.as_view()),
    path('get-track-ids', getTrackIds.as_view()),
    path('get-labels', getLabels.as_view()),
    path('get-dimension-reduction', getDimensionReduction.as_view()),
    path('celery-task', celeryTask.as_view())
]
