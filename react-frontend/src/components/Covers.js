import styled from "styled-components";

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
    float: left;
    margin-left: 50%;
    transform: translate(-50%);
    clear: left;
    padding: 1em;
`

const PlaylistsInfoContainer = styled.div`
    position: fixed;
    margin-left: 50%;
    margin-top: 5em;
    padding: 1em;
    color: white;
`

const Covers = ({ images, selectPlaylist, userInfo, ids, titles, artists, features }) => {
    return(
        <Grid>
            <PlaylistsCoversContainer>
                {images.map((image, index) => (
                    <PlaylistsCover
                        key={index}
                        src={image}
                        alt="Playlist cover"
                        onClick={() => selectPlaylist(ids[index])}
                    />
                ))}
            </PlaylistsCoversContainer>
            <PlaylistsInfoContainer>
                <h1>Welcome, {userInfo.display_name}</h1>
                <p>Playlist length: {titles.length}</p>
            </PlaylistsInfoContainer>
        </Grid>
    )
}

export default Covers;