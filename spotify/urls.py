from django.urls import path
from .views import *

from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('playlists', userPlaylists.as_view()),
    path('user-profile', userProfile.as_view()),
    path('get-track-ids', getTrackIds.as_view()),
    path('get-labels', labelsAsync.as_view()),
    path('get-dimension-reduction', getDimensionReduction.as_view()),
    path('task-result', taskStatus.as_view()),
    path('dimension-reduction-async', dimensionReductionAsync.as_view()),
    path('generate-playlists', generatePlaylists.as_view()),
    path('event-stream', eventStream.as_view())
]

