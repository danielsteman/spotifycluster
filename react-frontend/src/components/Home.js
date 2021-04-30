import { Redirect } from 'react-router-dom';
import CoverSlider from './CoverSlider';

const Home = ({ authenticated, userInfo, playlistList, selectPlaylist }) => {
    const images = playlistList.map(x => x.images[0].url)
    const ids = playlistList.map(x => x.id)
    if (authenticated) {
        return(
            <CoverSlider
                images={images} 
                selectPlaylist={selectPlaylist} 
                userInfo={userInfo}
                ids={ids}
            />
        )
    } else {
        return (
            <Redirect to='/login'/>
        )
    }
}

export default Home