import {
    BrowserRouter as Router
  } from "react-router-dom";
import App from '../App';
import { useState } from 'react';

// To get a loading screen between routes, I needed to lift the loading state to a HOC

const Root = () => {

    const [loading, setLoading] = useState(true)

    const showLoading = () => (
        setLoading(true)
    )

    const hideLoading = () => (
        setLoading(false)
    )

    return(
        <Router>
            <App loading={loading} showLoading={() => showLoading()} hideLoading={() => hideLoading()}/>
        </Router>
    )
}

export default Root