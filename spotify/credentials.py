import os

CLIENT_ID = "ee2e82f92836476196842f7b2818c559"
CLIENT_SECRET = "b0fd34a734ed4fc48056d114d0205803"

# if os.environ.get('DEVELOPMENT_MODE') == 'TRUE':
#     REDIRECT_URI = 'http://127.0.0.1:3000/spotify/redirect'
#     URL = 'http://127.0.0.1:3000/'
# else:
#     REDIRECT_URI = 'http://nameless-taiga-02413.herokuapp.com/spotify/redirect'
#     URL = 'http://nameless-taiga-02413.herokuapp.com/'

# needs to be https://nameless-taiga-02413.herokuapp.com/spotify/redirect in production
REDIRECT_URI = 'http://nameless-taiga-02413.herokuapp.com/spotify/redirect'
# needs to be https://nameless-taiga-02413.herokuapp.com/ in production
URL = 'http://nameless-taiga-02413.herokuapp.com/'