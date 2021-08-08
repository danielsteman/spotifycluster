import { Redirect } from 'react-router-dom';
import Covers from './Covers'

const Home = ({ 
    authenticated, 
    userInfo, 
    playlistList, 
    selectPlaylist, 
    titles, 
    features,
    TSNEfeatures,
    ids, 
    uris,
    artists, 
    selectedPlaylist, 
    setSelectPlaylistId,
    getLabels,
    labels
}) => {
    const images = playlistList.map(x => x.images[0] ? x.images[0].url : '')
    if (authenticated) {
        return(
            <Covers
                images={images}
                selectPlaylist={selectPlaylist} 
                userInfo={userInfo}
                titles={titles}
                artists={artists}
                features={features}
                ids={ids}
                playlistList={playlistList}
                selectedPlaylist={selectedPlaylist}
                setSelectPlaylistId={setSelectPlaylistId}
                TSNEfeatures={TSNEfeatures}
                getLabels={getLabels}
            />
        )
    } else {
        return (
            <Redirect to='/login'/>
        )
    }
}

export default Home