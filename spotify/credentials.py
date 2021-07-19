from spotifycluster.settings import DEBUG

CLIENT_ID = "ee2e82f92836476196842f7b2818c559"
CLIENT_SECRET = "b0fd34a734ed4fc48056d114d0205803"

if DEBUG:
    REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect"
    URL = "http://127.0.0.1:8000"
else:
    REDIRECT_URI = "http://nameless-taiga-02413.herokuapp.com/spotify/redirect"
    URL = "http://nameless-taiga-02413.herokuapp.com"