from celery import shared_task
from spotifycluster.celery import app
from .machine_learning import *

"""
Transform sklearn functions to async Celery tasks
that can be called asynchronously. Results are serialised -> cast to list.
""" 

@shared_task
def TSNE_reduce_async(X):
    result = TSNE_reduce(X)
    list_result = result.tolist()
    return list_result

@shared_task
def KMeans_async(X):
    result = KMeans_labeler(X)
    list_result = result.tolist()
    return list_result

@shared_task
def MeanShift_async(X):
    result = MeanShift_labeler(X)
    list_result = result.tolist()
    return list_result

@shared_task
def AffinityPropagation_async(X):
    result = AffinityPropagation_labeler(X)
    list_result = result.tolist()
    return list_result



