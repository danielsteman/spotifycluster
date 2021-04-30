// import { Redirect } from 'react-router-dom';

const Login = ( {handleLogin} ) => {
    return (
        <div>
            <h1>
                Welcome!
            </h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login