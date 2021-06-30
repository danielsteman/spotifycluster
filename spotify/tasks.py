from __future__ import absolute_import, unicode_literals

from celery import shared_task

import time

from .machine_learning import AffinityPropagation_labeler

@shared_task(bind=True)
def AffinityPropagation_task(self, X):
    self.update_state(state='PENDING')
    time.sleep(2)
    print (X)
    output = sum(X)
    self.update_state(state='COMPLETE')
    return output
