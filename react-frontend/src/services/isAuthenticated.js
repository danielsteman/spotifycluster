import axios from 'axios';

const isAuthenticated = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: '/spotify/is-authenticated'
        })
        const data = await res.data
        const status = data.status
        return status
    } catch (e) {
        console.log(e)
    }
}

export default isAuthenticated