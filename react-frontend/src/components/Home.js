import { Redirect } from 'react-router-dom';
import Covers from './Covers'

const Home = ({ 
    authenticated, 
    userInfo, 
    playlistList, 
    selectPlaylist, 
    titles, 
    features, 
    ids, 
    artists, 
    selectedPlaylist, 
    setSelectPlaylistId 
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
            />
        )
    } else {
        return (
            <Redirect to='/login'/>
        )
    }
}

export default Home