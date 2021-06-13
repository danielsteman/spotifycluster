import { Switch, Route, useRouteMatch } from 'react-router-dom';
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

  const [selectedPlaylist, setSelectedPlaylist] = useState('')

  const [titles, setTitles] = useState([])
  const [artists, setArtists] = useState([])
  const [features, setFeatures] = useState([])
  const [TSNEfeatures, setTSNEfeatures] = useState([])
  const [ids, setIds] = useState([])

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
        const ids = data.playlists.items.map(x => x.id)
        setIds(ids)
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
  
  //     history.push({pathname: `playlists/${playlistId}`, data})

  // this method is passed down so the state can be updated from child components
  const setSelectPlaylistId = (playlistId) => {
    setSelectedPlaylist(playlistId)
  }

  const fetchPlaylist = (playlistId) => {

    showLoading()

    setTitles([])
    setArtists([])
    setFeatures([])
    setTSNEfeatures([])
    setIds([])

    const getPlaylistDataRecursively = (url) => {
      return fetch('/spotify/get-track-ids', {headers: {
        'url': url
      }})
      .then(response => response.json())
      .then(data => {

        console.log(data)

        setTitles(titles => ([...titles, data.title]))
        setArtists(artists => ([...artists, data.artist]))
        setFeatures(features => ([...features, data.features]))
        setTSNEfeatures(TSNEfeatures => ([...TSNEfeatures, data.TSNEfeatures]))
        setIds(ids => ([...ids, data.track_ids]))

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
    <div>
      <Navigation/>
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
            titles={titles}
            artists={artists}
            features={features}
            TSNEfeatures={TSNEfeatures}
            ids={ids}
            selectedPlaylist={selectedPlaylist}
            setSelectPlaylistId={setSelectPlaylistId}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;