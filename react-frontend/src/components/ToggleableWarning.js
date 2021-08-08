import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button';
import './ToggleableWarning.css';
import { Link } from "react-router-dom";
import generatePlaylists from '../services/generatePlaylists'

const ToggleableWarning = ({ toggleWarning, warningVisible, userId }) => {

    console.log(userId)

    return (
        <Toast show={warningVisible} onClose={toggleWarning}>
            <Toast.Header>
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>
                <p>By clicking on continue, new playlists will be created for your Spotify account. Click <Link to="/">here</Link> for more information.</p>
                <Button onClick={() => generatePlaylists(userId, 'Test', 5)}>Continue</Button>
            </Toast.Body>
      </Toast>
    )
}

export default ToggleableWarning;

