import './Login.css'

const Login = ( {handleLogin} ) => {
    return (
        <div>
            <div className='typewriter'>
                <h1>Find clusters in your Spotify playlists using ...</h1>
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login