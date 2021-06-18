import styled from "styled-components";
import { useHistory } from 'react-router-dom';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
`

const PlaylistsCoversContainer = styled.div`
    padding: 1em;
    margin-top: 3em;
`

const PlaylistsCover = styled.img`
    height: 350px;
    width: 350px;
    margin-left: 50%;
    transform: translate(-50%);
    padding: 1em;
`

const PlaylistsInfoContainer = styled.div`
    grid-row-start: 1;
    grid-column-start: 2;
    margin-top: 5em;
    padding: 1em;
    color: white;
`

const Covers = ({ 
    images, 
    selectPlaylist, 
    userInfo, 
    ids, 
    titles, 
    artists, 
    features,
    TSNEfeatures,
    playlistList, 
    selectedPlaylist, 
    setSelectPlaylistId,
    getLabels }) => {

    const dataPointLabels = artists.map((artist, index) => {
        return `${artist} - ${titles[index]}`
    })

    const data = {'dataPointLabels': dataPointLabels, 'TSNE_features': TSNEfeatures, 'features': features}

    const history = useHistory()

    // history.push({pathname: `playlists/${playlistId}`, data})

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
                <h1>Hi, {userInfo.display_name}</h1>
                <p>Choose playlist to analyse.</p>
                <p>Playlist length: {titles.length}</p>
                <button onClick={() => {
                    history.push({pathname: `playlists/${selectedPlaylist}`, data})
                }}>Plot</button>
            </PlaylistsInfoContainer>
        </Grid>
    )
}

export default Covers;