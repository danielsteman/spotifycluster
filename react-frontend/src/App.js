import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Playlist from './components/Playlist'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import React, { useState, useEffect } from "react";
import './App.css'

const App = ({ loading, showLoading, hideLoading }) => {

  const [authenticated, setAuthenticated] = useState(false)
  const [playlistList, setPlaylistList] = useState([])
  const [userInfo, setUserInfo] = useState({})

  const [titles, setTitles] = useState([])
  const [artists, setArtists] = useState([])
  const [features, setFeatures] = useState([])
  const [ids, setIds] = useState([])

  const history = useHistory()

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
    console.log(authenticated)
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
        console.log(userInfo.display_name)
        hideLoading()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])
  
  //     history.push({pathname: `playlists/${playlistId}`, data})

  const fetchPlaylist = (playlistId) => {
    showLoading()
    const getPlaylistDataRecursively = (url) => {
      return fetch('/spotify/get-track-ids', {headers: {
        'url': url
      }})
      .then(response => response.json())
      .then(data => {
        console.log(data)

        setTitles([...titles, data.title])
        setArtists([...artists, data.artist])
        setFeatures([...features, data.features])
        setIds([...ids, data.track_ids])

        if (data.next_url) {
          const next_url = data.next_url.replace('https://api.spotify.com/v1', '')
          return getPlaylistDataRecursively(next_url)
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

  if (loading) { return <LoadingScreen/> }
  return (
    <Switch>
      <div class='app'      >
        <Navigation/>
          <Route path='/playlists/:id'>
            <Playlist 
              id={playlist}
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
              ids={ids}
            />
          </Route>
      </div>
    </Switch>
  )
}

export default App;