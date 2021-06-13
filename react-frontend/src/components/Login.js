import './Login.css'

const Login = ( {handleLogin} ) => {
    return (
        <div className='container'>
            <div className='typewriter'>
                <h1>Find clusters in your Spotify playlists using ...</h1>
            </div>
            <button className='loginButton' onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login