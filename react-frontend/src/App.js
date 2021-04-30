import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Playlist from './components/Playlist'
import LoadingScreen from './components/LoadingScreen'
import React, { useState, useEffect } from "react";
import './App.css'

const App = ({ loading, showLoading, hideLoading }) => {

  const [authenticated, setAuthenticated] = useState(false)
  const [playlistList, setPlaylistList] = useState([])
  const [userInfo, setUserInfo] = useState({})

  const history = useHistory()

  useEffect(() => {
    fetch('/spotify/is-authenticated')
      .then(response => response.json())
      .then(data => {
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

  const fetchPlaylist = (playlistId) => {  
    showLoading()
    fetch('/spotify/get-tracks-data', {headers: {
        'id': playlistId
    }})
    .then(response => response.json())
    .then(data => {
      history.push({pathname: `playlists/${playlistId}`, data})
      hideLoading()
    })
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
        />
      </Route>
    </Switch>
  )
}

export default App;