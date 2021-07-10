from celery import shared_task
from spotifycluster.celery import app
from .machine_learning import TSNE_reduce

@app.task(trail=True)
def AffinityPropagation_task(X):
    return sum(X)

@shared_task
def TSNE_reduce_async(X):
    result = TSNE_reduce(X)
    # Convert to list to make it JSON serializable
    list_result = result.tolist()
    return list_result


