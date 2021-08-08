import axios from 'axios';

const fillPlaylists = (playlistIds, labels, uris) => {

    return ["2ygy5SpaMgEW8syHI4ppu4", "6rq663Rc32EVrArnrMbtGa", "26b3pvSiKLJy2BN4Dkr1l5", "5XeiUC8Zp4gpGATzcsneoz", "3lDK6tvzBQf40X6voXBw4z"]

    // const headers = {
    //     'playlist-ids': playlistIds,
    //     'labels': labels,
    //     'uris': uris
    // }

    // console.log(`fill playlist parameters: ${headers}`)

    // return axios({
    //     method: 'post',
    //     url: '/spotify/fill-playlists',
    //     headers: headers
    // })
    // .then(res => {
    //     console.log(res.data)
    //     return res.data
    // })
    // .catch(e => console.log(e))
}

export default fillPlaylists