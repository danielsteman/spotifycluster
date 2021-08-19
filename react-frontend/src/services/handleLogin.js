import axios from 'axios';
import isAuthenticated from './isAuthenticated';

const handleLogin = async () => {
    try {
        const authenticationStatus = await isAuthenticated()
        if (!authenticationStatus) {
            const res = await axios({
                method: 'get',
                url: '/spotify/get-auth-url'
            })
            const loginUrl = await res.data.url
            console.log(loginUrl)
            return loginUrl
        } else {
            return true
        }
    } catch (e) {
        console.log(e)
    }
}

export default handleLogin