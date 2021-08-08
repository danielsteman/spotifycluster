import axios from 'axios';

const generatePlaylists = (userId, name, n) => {

    const headers = {
        'user-id': userId,
        'new-playlist-name': name,
        'n': n
    }

    console.log(headers)

    const response = axios({
        method: 'post',
        url: '/spotify/generate-playlists', 
        headers: headers
    })
    .then(res => {
        console.log(res.data)
        return res.data
    })

    return response
}

export default generatePlaylists