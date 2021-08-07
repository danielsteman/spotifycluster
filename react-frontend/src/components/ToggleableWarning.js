import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button';
import './ToggleableWarning.css';
import { Link } from "react-router-dom";

const ToggleableWarning = ({ toggleWarning, warningVisible }) => {

    return (
        <Toast show={warningVisible} onClose={toggleWarning}>
            <Toast.Header>
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>
                By clicking on continue, new playlists will be created for your Spotify account. Click <Link to="/">here</Link> for more information.
                <Button>Continue</Button>
            </Toast.Body>
      </Toast>
    )
}

export default ToggleableWarning;

