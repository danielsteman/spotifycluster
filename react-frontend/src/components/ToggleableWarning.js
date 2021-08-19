import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button';
import './ToggleableWarning.css';
import { Link } from "react-router-dom";
import generateAndFill from '../services/generateAndFill'
import { useHistory } from 'react-router-dom';

const ToggleableWarning = ({ toggleWarning, warningVisible, userId, uris, labels, showLoading, hideLoading }) => {

    let history = useHistory();

    return (
        <Toast show={warningVisible} onClose={toggleWarning}>
            <Toast.Header>
                <strong className="me-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>
                <p>By clicking on continue, new playlists will be created for your Spotify account. Click <Link to="/">here</Link> for more information.</p>
                <Button onClick={async () => {
                    showLoading('Creating playlists');
                    await generateAndFill(labels, uris, userId, 'cluster')
                    hideLoading()
                    history.push('/result')
                }}
                >Continue</Button>
            </Toast.Body>
        </Toast>
    )
}

export default ToggleableWarning;

