import { Link } from "react-router-dom"
import './Navigation.css'

const Navigation = () => {
    return (
        <div className="bar">
            <Link to="/">Home</Link>
            <Link to="/notes">Login</Link>
            <Link to="/users">About</Link>
        </div>
    )
}

export default Navigation
