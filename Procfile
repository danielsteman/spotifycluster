web: gunicorn spotifycluster.wsgi
worker: celery -A spotify.tasks worker --loglevel=INFO