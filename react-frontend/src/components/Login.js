import './Login.css'

const Login = ( {handleLogin} ) => {
    return (
        <div class='container'>
            <div class='typewriter'>
                <h1>Find clusters in your Spotify playlists using ...</h1>
            </div>
            <button class='loginButton' onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login