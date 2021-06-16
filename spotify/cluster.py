from sklearn.cluster import KMeans, MeanShift, AffinityPropagation
from sklearn.manifold import TSNE

def TSNE_reduce(X):
    reduced_data = TSNE(n_components=3).fit_transform(X)
    return (reduced_data)

def KMeans_labeler(X):
    model = KMeans(n_clusters=5, random_state=0)
    model.fit(X)
    labels = model.labels_
    return (labels)

def MeanShift_labeler(X):
    model = MeanShift(n_jobs=-1)
    model.fit(X)
    labels = model.labels_
    return (labels)

def AffinityPropagation_labeler(X):
    model = AffinityPropagation(
        random_state=5, 
        verbose=True, 
        max_iter=5000, 
        convergence_iter=150
    )
    model.fit(X)
    labels = model.labels_
    return (labels)
