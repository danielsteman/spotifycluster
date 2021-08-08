import axios from 'axios';

const generatePlaylists = (userId, name, n) => {

    const headers = {
        'user-id': userId,
        'new-playlist-name': name,
        'n': n
    }

    console.log(headers)

    return axios({
        method: 'post',
        url: '/spotify/generate-playlists', 
        headers: headers
    })
    .then(res => {
        console.log(res.data)
        return res.data
    })
    .catch(e => console.log(e))
}

export default generatePlaylists
