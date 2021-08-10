import axios from 'axios';
import uniqueValues from '../utils/uniqueValues'

const generatePlaylists = (userId, name, n) => {

    const headers = {
        'user-id': userId,
        'new-playlist-name': name,
        'n': n
    }

    console.log(`generate playlist request headers: ${headers}`)

    const promise = axios({
        method: 'post',
        url: '/spotify/generate-playlists', 
        headers: headers
    })

    const dataPromise = promise.then(res => res.data).catch(e => console.log(e))

    return dataPromise
    // return ["1MmtlDnsahcF1h4J6DUbFG", "2B45K2l7gzmyhTIlBaGEMd", "2XUOaIrgPywmTCrnPuEQ9U", "16TLp1kbCWII9oQjtpqAhd", "7aMPkDY3LOGhZspqNDBlAG"]
}

const fillPlaylists = (playlistIds, labels, uris) => {

    const headers = {
        'playlist-ids': playlistIds,
        'labels': labels,
        'uris': uris
    }

    console.log(`fill playlist parameters: ${headers}`)

    return axios({
        method: 'post',
        url: '/spotify/fill-playlists',
        headers: headers
    })
    .then(res => {
        console.log(res.data)
        return res.data
    })
    .catch(e => console.log(e))
}

const generateAndFill = (playlistIds, labels, uris, userId, name, n) => {
    
    const setOfLabels = uniqueValues(labels)
    
    setOfLabels.forEach(element => {
        console.log(uris.filter((val, i) => labels[i] === element))
    });

}

export default generateAndFill