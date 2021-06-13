# spotifycluster

## General info

Leveraging algorithms of scikit-learn to find clusters within your playlists. 

Documentation: https://scikit-learn.org/stable/modules/clustering.html

The backend makes use of Spotify authorization so users can log in and give permission to the app the fetch playlist data. 

Documentation: https://developer.spotify.com/documentation/general/guides/authorization-guide/

## Technology :technologist:

#### Backend
django  
sklearn

#### Database
sqlite3

#### Frontend
react.js  
react-router   
styled-components  
plotly.js

## Data :bar_chart:

The algorithms are finding clusters based on nine features that are provided by the Spotify web API:
```
danceability
energy
loudness
speechiness
acousticness
instrumentalness
liveness
valence
tempo
 ```
