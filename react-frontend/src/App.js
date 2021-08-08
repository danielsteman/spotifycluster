import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Playlist from './components/Playlist'
import LoadingScreen from './components/LoadingScreen'
import ErrorScreen from './components/ErrorScreen'
import React, { useState, useEffect } from "react";
import './App.css'

const App = ({ loading, loadingCaption, showLoading, hideLoading }) => {

  const [authenticated, setAuthenticated] = useState(false)

  const [playlistList, setPlaylistList] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [titles, setTitles] = useState([])
  const [artists, setArtists] = useState([])
  const [ids, setIds] = useState([])
  const [uris, setUris] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState('')

  const [features, setFeatures] = useState([])
  const [TSNEfeatures, setTSNEfeatures] = useState([])

  const [labels, setLabels] = useState([])

  useEffect(() => {
    fetch('/spotify/is-authenticated')
      .then(response => response.json())
      .then(data => {
        console.log(`authentication status: ${data.status}`)
        setAuthenticated(data.status)
        hideLoading()
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (authenticated) {
      fetch('/spotify/playlists')
      .then(response => response.json())
      .then(data => {
        setPlaylistList(data.playlists.items)
      })
      fetch('/spotify/user-profile')
      .then(response => response.json())
      .then(data => {
        setUserInfo(data.user_profile)
        hideLoading()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])

  // setSelectPlaylistId method is passed down so the state can be updated from child components
  const setSelectPlaylistId = (playlistId) => {
    setSelectedPlaylist(playlistId)
  }

  const getLabels = (model) => {
    showLoading('Calculating labels...')
    fetch('/spotify/get-labels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Model': model
      },
      body: JSON.stringify(features)
    })
    .then(response => response.json())
    .then(data => {

      hideLoading()

      const interval = setInterval(() => {
        fetch('/spotify/task-result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'taskId': data
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.state === 'SUCCESS') {
            setLabels(data.result)
            clearInterval(interval)
          }
        })
      }, 3000)
    })
  }

  const fetchPlaylist = (playlistId) => {

    showLoading('Fetching data points...')

    setTitles([])
    setArtists([])
    setFeatures([])
    setTSNEfeatures([])
    setIds([])
    setUris([])
    setLabels([])

    const features = []

    const getPlaylistDataRecursively = (url) => {
      return fetch('/spotify/get-track-ids', {headers: {
        'url': url
      }})
      .then(response => response.json())
      .then(data => {

        console.log(data)

        setTitles(titles => ([...titles, ...data.title]))
        setArtists(artists => ([...artists, ...data.artist]))
        setFeatures(features => ([...features, ...data.features]))
        setIds(ids => ([...ids, ...data.track_ids]))
        setUris(uris => ([...uris, ...data.track_uris]))
        features.push(data.features)

        if (data.next_url) {
          const next_url = data.next_url.replace('https://api.spotify.com/v1', '')
          return getPlaylistDataRecursively(next_url)
        } else {

          return fetch('/spotify/dimension-reduction-async', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'features': features.flat()
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(`task id: ${data}`)
            const interval = setInterval(() => {
              fetch('/spotify/task-result', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'taskId': data
                }
              })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if (data.state === 'SUCCESS') {
                  setTSNEfeatures(data.result)
                  clearInterval(interval)
                }
              })
            }, 3000)
          })
        }
      })
    }

    return getPlaylistDataRecursively(`/playlists/${playlistId}/tracks/?offset=0&limit=100`)
      .then(() => {
        hideLoading()
      });
  }

  const handleLogin = () => {  
    return(
    fetch('/spotify/is-authenticated')
      .then(response => response.json())
      .then(data => {
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then(response => response.json())
            .then(data => {
              setAuthenticated(true)
              window.location.replace(data.url)
            })
        }
      })
    )
  }

  const match = useRouteMatch('/playlists/:id')
  const playlist = match
    ? playlistList.find(playlist => playlist.id === Number(match.params.id))
    : null

  if (loading) { return <LoadingScreen loadingCaption={loadingCaption}/> }
  return (
    <div>
      <Switch>
        <Route path='/playlists/:id'>
          <Playlist
            id={playlist}
            getLabels={getLabels}
            labels={labels}
            uris={uris}
          />
        </Route>
        <Route path='/login'>
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path='/'>
          <Home
            authenticated={authenticated}
            userInfo={userInfo}
            playlistList={playlistList}
            selectPlaylist={fetchPlaylist}
            titles={titles}
            artists={artists}
            features={features}
            TSNEfeatures={TSNEfeatures}
            ids={ids}
            selectedPlaylist={selectedPlaylist}
            setSelectPlaylistId={setSelectPlaylistId}
            getLabels={getLabels}
          />
        </Route>
        <Route component={ErrorScreen} />
      </Switch>
    </div>
  )
}

export default App;