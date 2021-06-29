from __future__ import absolute_import, unicode_literals

from celery import shared_task

import time

from .machine_learning import AffinityPropagation_labeler

@shared_task(trail=True)
def AffinityPropagation_task(X):
    task = AffinityPropagation_labeler(X)

    return 'task initiated'

