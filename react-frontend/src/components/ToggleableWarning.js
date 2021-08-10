import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button';
import './ToggleableWarning.css';
import { Link } from "react-router-dom";
import generateAndFill from '../services/generateAndFill'
// import fillPlaylists from '../services/fillPlaylists'

const ToggleableWarning = ({ toggleWarning, warningVisible, userId, uris, labels }) => {

    console.log(`uris: ${uris}`)
    console.log(`labels: ${labels}`)

    return (
        <Toast show={warningVisible} onClose={toggleWarning}>
            <Toast.Header>
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>
                <p>By clicking on continue, new playlists will be created for your Spotify account. Click <Link to="/">here</Link> for more information.</p>
                <Button onClick={() => {

                    const playlistIds = ["1MmtlDnsahcF1h4J6DUbFG", "2B45K2l7gzmyhTIlBaGEMd", "2XUOaIrgPywmTCrnPuEQ9U", "16TLp1kbCWII9oQjtpqAhd", "7aMPkDY3LOGhZspqNDBlAG"]
                    generateAndFill(playlistIds, labels, uris, userId, 'test', 5)

                    // generatePlaylists(userId, 'Test', 5)
                    // .then(res => res.json)
                    // .then(data => console.log(data))
                }}
                    // return fillPlaylists(newPlaylistIds, labels, uris)
                >Continue</Button>
            </Toast.Body>
      </Toast>
    )
}

export default ToggleableWarning;

