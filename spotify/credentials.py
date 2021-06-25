import os
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path('../.env')
load_dotenv()

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

try:
    REDIRECT_URI = os.getenv('LOCAL_REDIRECT_URL')
    URL = os.getenv('LOCAL_URL')
except:
    REDIRECT_URI = 'http://nameless-taiga-02413.herokuapp.com/spotify/redirect'
    URL = 'http://nameless-taiga-02413.herokuapp.com'