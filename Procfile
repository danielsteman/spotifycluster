web: gunicorn spotifycluster.wsgi
worker: celery -A spotify.tasks worker --loglevel=INFO
daphne spotifycluster.asgi:application