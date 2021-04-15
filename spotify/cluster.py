from sklearn.cluster import KMeans
from sklearn.manifold import TSNE

def TSNE_reduce(X):
    reduced_data = TSNE(n_components=3).fit_transform(X)
    return (reduced_data)

def KMeans_embedded(X):
    model = KMeans(n_clusters=5, random_state=0)
    model.fit(X)
    labels = model.labels_
    return (labels)

