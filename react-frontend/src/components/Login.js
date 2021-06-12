import './Login.css'

const Login = ( {handleLogin} ) => {
    return (
<<<<<<< HEAD
        <div class='container'>
            <div class='typewriter'>
                <h1>Find clusters in your Spotify playlists using ...</h1>
            </div>
            <button class='loginButton' onClick={handleLogin}>Login</button>
=======
        <div>
            <div className='typewriter'>
                <h1>Find clusters in your Spotify playlists using ...</h1>
            </div>
            <button onClick={handleLogin}>Login</button>
>>>>>>> 43117836e3f7964e93a980d98579f0a13579b606
        </div>
    )
}

export default Login