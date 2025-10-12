import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BsSearch, BsPerson, BsStar, BsBag } from 'react-icons/bs';
import './header.css';

const Header = () => {
    return (
        <Navbar className="custom-navbar" expand="lg">
            <Nav className="me-auto nav-links">
                <Nav.Link href="#" className="nav-link-home mx-4">HOME</Nav.Link>
                <Nav.Link href="#" className="nav-link-home me-4">SHOP</Nav.Link>
                <Nav.Link href="#" className="nav-link-home me-4">PRODUCT</Nav.Link>
                <div className="nav-dropdown-item me-4">
                    <span className="nav-link dropdown-toggle">PAGES</span>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">ABOUT US</a>
                        <a className="dropdown-item" href="#">CONTACT US</a>
                        <a className="dropdown-item" href="#">FAQ</a>
                    </div>
                </div>
                <div className="nav-dropdown-item">
                    <span className="nav-link dropdown-toggle">BLOG</span>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Left Sidebar</a>
                        <a className="dropdown-item" href="#">Blog Post</a>
                    </div>
                </div>
            </Nav>
            <Navbar.Brand href="#" className="mx-auto brand-logo fs-1">
                GLOWING
            </Navbar.Brand>
            <Nav className="ms-auto right-icons">
                <Nav.Link href="#" className='ms-3'><BsSearch /></Nav.Link>
                <Nav.Link href="#" className='ms-3'><BsPerson /></Nav.Link>
                <Nav.Link href="#" className='ms-3'><BsStar /></Nav.Link>
                <Nav.Link href="#" className="cart-icon-container ms-3 me-5">
                    <BsBag />
                    <span className="cart-badge">0</span>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
export default Header;
