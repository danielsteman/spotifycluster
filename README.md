# spotifycluster

## General info

Leveraging algorithms of scikit-learn to find clusters within your playlists. 

Documentation: https://scikit-learn.org/stable/modules/clustering.html

The backend makes use of Spotify authorization so users can login and grant permission to fetch their data for analysis. 

Documentation: https://developer.spotify.com/documentation/general/guides/authorization-guide/

## Technology :technologist:

#### Frontend
react.js  
react-router   
styled-components  
plotly.js

#### Backend
django  
celery  
rabbitmq  

#### Machine Learning
sklearn

#### Database
sqlite3

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

## Launch commands :rocket:

These commands are automatically executed when opening the project in VS code. Settings for this automated operation live in .vscode/settings.json.
```
celery -A spotifycluster worker --loglevel=INFO  
python manage.py runserver  
cd react-frontend && npm start
 ```
Before opening (and running) the project, start a local RabbitMQ instance:
```
brew services start rabbitmq 
 ```

## Environment variables :earth_africa:

Mind that Heroku rotates credentials periodically and updates applications where this datastore is attached.
```
CLIENT_ID={your spotify client id}
CLIENT_SECRET={your spotify client secret}
DATABASE_URL={URL to sqlite database}
REDIS_URL={URL to Heroku Redis instance}
 ```

