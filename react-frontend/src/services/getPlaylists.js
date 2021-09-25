import axios from 'axios';

const getPlaylists = async (authenticationStatus) => {

    if (authenticationStatus) {
        try {
            const res = await axios({
                method: 'get',
                url: '/spotify/playlists'
            })
            const data = await res.data
            const playlists = data.playlists.items
            return playlists
        } catch (e) {
            console.log(e)
        }
    } else {
        throw new Error('Get credentials before fetching playlist data')
    }

}

export default getPlaylists