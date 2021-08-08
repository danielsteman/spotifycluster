import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button';
import './ToggleableWarning.css';
import { Link } from "react-router-dom";
import generatePlaylists from '../services/generatePlaylists'
import fillPlaylists from '../services/fillPlaylists'

const ToggleableWarning = ({ toggleWarning, warningVisible, userId, uris, labels }) => {

    console.log(uris)
    console.log(labels)

    return (
        <Toast show={warningVisible} onClose={toggleWarning}>
            <Toast.Header>
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>
                <p>By clicking on continue, new playlists will be created for your Spotify account. Click <Link to="/">here</Link> for more information.</p>
                <Button onClick={() => generatePlaylists(userId, 'Test', 5).then(newPlaylistIds => {
                    console.log(newPlaylistIds)
                    return fillPlaylists(newPlaylistIds, labels, uris)
                })}>Continue</Button>
            </Toast.Body>
      </Toast>
    )
}

export default ToggleableWarning;

