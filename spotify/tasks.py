from celery import Celery
from .machine_learning import AffinityPropagation_labeler
import time

app = Celery('spotifycluster', broker='amqp://guest@localhost//')

@app.task
def AffinityPropagation_task(X):
    time.sleep(2)
    return sum(X)
