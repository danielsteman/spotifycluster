"""
WSGI config for spotifycluster project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

# from django.core.wsgi import get_wsgi_application

# from whitenoise.django import DjangoWhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'spotifycluster.settings')
os.environ['DJANGO_CONFIGURATION'] = 'production'
os.environ['PRODUCTION_BASE_URL'] = 'https://nameless-taiga-02413.herokuapp.com/'

# application = get_wsgi_application()

# application = DjangoWhiteNoise(application)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()