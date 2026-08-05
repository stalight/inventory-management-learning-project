import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {

    return (
        <nav>
            <div className='navbar'>
                <Link to="/">Home</Link>
            </div>
        </nav>
    )
}

export default Navbar;