import {
    BrowserRouter as Router
  } from "react-router-dom";
import App from '../App';
import { useState } from 'react';

// To get a loading screen between routes, I needed to lift the loading state to a HOC

const Root = () => {

    const [loading, setLoading] = useState(true)
    const [loadingCaption, setLoadingCaption] = useState('')

    const showLoading = (loadingCaption) => {
        setLoading(true)
        setLoadingCaption(loadingCaption)
    }

    const hideLoading = () => {
        setLoading(false)
        setLoadingCaption('')
    }

    return(
        <Router>
            <App loading={loading} loadingCaption={loadingCaption} showLoading={showLoading} hideLoading={hideLoading}/>
        </Router>
    )
}

export default Root