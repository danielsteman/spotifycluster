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
    artists, 
    selectedPlaylist, 
    setSelectPlaylistId,
    getLabels
}) => {
    const images = playlistList.map(x => x.images[0].url)
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