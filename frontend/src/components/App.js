import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Plot from 'react-plotly.js';

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [playlistData, setPlaylistData] = useState([])
    const [userData, setUserData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [selectedPlaylist, setSelectedPlaylist] = useState('')
    const [featureData, setFeatureData] = useState([])

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/spotify/playlists')
            .then(response => response.json())
            .then(data => {
                setPlaylistData(data.playlists.items)
                console.log(`Fetching playlist data done`)
                console.log(data.playlists.items)
            })
            fetch('/spotify/user-profile')
            .then(response => response.json())
            .then(data => {
                setUserData(data.user_profile)
                setLoading(false)
            })
        }
    }, [isAuthenticated])

    const fetchPlaylist = (playlistId) => {  
        setLoading(true)
        fetch('/spotify/get-tracks-data', {headers: {
            'id': playlistId
        }})
        .then(response => response.json())
        .then(data => {
            setFeatureData(data)
            console.log('tracks data:')
            console.log(data)
            setLoading(false)
        })
        return (setSelectedPlaylist(playlistId))
    }

    const authenticateSpotify = () => {
        fetch('/spotify/is-authenticated')
            .then(response => response.json())
            .then(data => {
                setIsAuthenticated(data.status)
                console.log(`User is authenticated: ${data.status}`)
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                    .then(response => response.json())
                    .then(data => {
                        window.location.replace(data.url)
                    })
                }
            })
    }

    

    if (isAuthenticated) {
        if (isLoading) { return <div> Loading ... </div> };
        return(
            <div>
                <h1>Welcome, {userData.display_name}</h1>
                <h3>Playlists</h3>
                {playlistData.map(x => {
                    return (
                    <div key={x.id}>
                        <img
                            src={x.images[0].url} 
                            alt="Playlist cover" 
                            width="250" 
                            height="250"
                            onClick={() => fetchPlaylist(x.id)}
                        />
                        {x.name}
                    </div>)
                })}
                <h3>Selected playlist</h3>
                {selectedPlaylist}
            </div>
        )
    } else {
        return(
            <div>
                <h1>Welcome</h1>
                <button onClick={authenticateSpotify}>Login</button>
            </div>
        )
    }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);