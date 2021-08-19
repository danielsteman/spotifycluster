import axios from 'axios';
import uniqueValues from '../utils/uniqueValues'
import pagination from '../utils/pagination'

const generatePlaylists = async (userId, name, n) => {

    const headers = {
        'user-id': userId,
        'new-playlist-name': name,
        'n': n
    }
    try {
        const res = await axios({
            method: 'post',
            url: '/spotify/generate-playlists', 
            headers: headers
        })
        const data = await res.data
        return data
    } catch (e) {
        console.log(e)
    }
    
}

const fillPlaylist = async (playlistId, uris) => {

    let _uris = []

    if (uris.length > 100) {
        _uris = pagination(uris)
    } else {
        _uris = [uris]
    }

    _uris.forEach(async batch => {
        let headers = {
            'playlist-id': playlistId,
            'uris': batch
        }
        try {
            const res = await axios({
                method: 'post',
                url: '/spotify/fill-playlist',
                headers: headers
            })
            const data = await res.data
            return data
        } catch (e) {
            console.log(e)
        }
    })

}

const generateAndFill = async (labels, uris, userId, name) => {

    const setOfLabels = uniqueValues(labels)
    const n = setOfLabels.length
    const playlistIds = await generatePlaylists(userId, name, n)
    
    // For each label, check if the label matches a label from the set of labels and assign to a playlist.
    // It doesn't matter to which playlist the cluster is assigned because no unique characteristics are identified for each cluster.

    setOfLabels.forEach( async (element, index) => {
        const playlistId = playlistIds[index]
        const songs = uris.filter((_, i) => labels[i] === element)
        await fillPlaylist(playlistId, songs)
    });

}

export default generateAndFill