import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import uniqueValues from "../utils/uniqueValues";
import Button from 'react-bootstrap/Button';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
`

const PlaylistsCoversContainer = styled.div`
    padding: 1em;
    grid-row-start: 1;
    grid-column-start: 1;
`

const PlaylistsCover = styled.img`
    object-fit: cover;
    width: 100%;
    max-height: 100%;
    margin-left: 50%;
    transform: translate(-50%);
    padding: 2vw 6vw;
    @media screen and (min-width: 1025px) {
        padding: 2vw 12vw;
    }
`

const PlaylistsInfoContainer = styled.div`
    grid-row-start: 1;
    grid-column-start: 2;
    position: sticky;
    top: 0;
    height: 100vh;
    padding: calc(1em + 2vh);
    color: white;
`

const PlaylistsInfoTitle = styled.div`
    font-family: 'Mulish', sans-serif;
    font-weight: 700;
    font-size: 4vw;    
    color: white;
`

const PlaylistsInstuctionText = styled.div`
    margin: 2vw 0;

    font-family: 'Mulish', sans-serif;
    font-style: italic;
    font-weight: 300;
    font-size: 2vw;    
    color: white;
`

const PlaylistsInfoText = styled.div`
    font-family: 'Mulish', sans-serif;
    font-weight: 300;
    font-size: 2vw;    
    color: white;
`

const Covers = ({ 
    images, 
    selectPlaylist, 
    userInfo, 
    titles,
    artists, 
    features,
    TSNEfeatures,
    playlistList, 
    selectedPlaylist, 
    setSelectPlaylistId
    }) => {

    const dataPointLabels = artists.map((artist, index) => {
        return `${artist} - ${titles[index]}`
    })

    const data = {
        'dataPointLabels': dataPointLabels, 
        'TSNE_features': TSNEfeatures, 
        'features': features, 
        'userId': userInfo.id,
    }

    const history = useHistory()

    return(
        <Grid>
            <PlaylistsCoversContainer>
                {images.map((image, index) => (
                    <PlaylistsCover
                        key={index}
                        src={image}
                        alt="Playlist cover"
                        onClick={() => {
                            selectPlaylist(playlistList.map(x => x.id)[index])
                            setSelectPlaylistId(playlistList.map(x => x.id)[index])
                        }}
                    />
                ))}
            </PlaylistsCoversContainer>
            <PlaylistsInfoContainer>
                <PlaylistsInfoTitle>Hi, {userInfo.display_name}</PlaylistsInfoTitle>
                <PlaylistsInstuctionText>Click on a playlist cover to fetch its data</PlaylistsInstuctionText>
                {titles.length > 0
                    && <div>
                        <PlaylistsInfoText>No. of songs: {titles.length}</PlaylistsInfoText>
                        <PlaylistsInfoText>No. of artists: {uniqueValues(artists).length}</PlaylistsInfoText>
                        {TSNEfeatures.length > 0
                            && <Button size="lg" style={{marginTop: "4vh"}} onClick={() => {
                                history.push({pathname: `playlists/${selectedPlaylist}`, data})
                            }}>Plot</Button>
                        }
                    </div>
                }
            </PlaylistsInfoContainer>
        </Grid>
    )
}

export default Covers;