import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="top-bar d-flex justify-content-between align-items-center px-3 py-3 flex-wrap">
                <span>Improved delivery service</span>
                <span>
                    <Link className="text-white fw-semibold text-decoration-none">
                        FREE UK Delivery Over £65*
                    </Link>
                </span>
                <span>
                    <Link className="text-white fw-semibold text-decoration-none">
                        BULK BUY OPTIONS AVAILABLE
                    </Link>
                </span>
            </div>

            <Container fluid className="middle-bar py-3">
                <Row className="align-items-center text-center">
                    <Col
                        xs={12}
                        md={4}
                        className="d-flex justify-content-center justify-content-md-start gap-3 social-icons"
                    >
                        <i className="bi bi-tiktok"></i>
                        <i className="bi bi-youtube"></i>
                        <i className="bi bi-instagram"></i>
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-pinterest"></i>
                    </Col>

                    <Col xs={12} md={4} className="text-center my-2 my-md-0">
                        <Link>
                            <img src="/img/logo.png" alt="logo" className="brand-logo" />
                        </Link>
                    </Col>

                    <Col
                        xs={12}
                        md={4}
                        className="d-flex justify-content-center justify-content-md-end align-items-center gap-3"
                    >
                        <div className="search-box d-flex align-items-center">
                            <i className="bi bi-search me-1"></i> <span>Search</span>
                        </div>
                        <i className="bi bi-heart"></i>
                        <i className="bi bi-person"></i>
                        <div className="cart position-relative">
                            <i className="bi bi-bag"></i>
                            <span className="cart-count">0</span>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className="nav-menu py-2">
                <Container>
                    <Nav className="justify-content-center flex-wrap gap-3 fw-bold small">
                        <Nav.Link as={Link} to="/Garden" className="menu-link">
                            GARDEN COMPOSTING
                        </Nav.Link>
                        <Nav.Link as={Link} to="/FoodWasteComp" className="menu-link">
                            FOOD WASTE COMPOSTING
                        </Nav.Link>
                        <Nav.Link as={Link} to="/WaterPage" className="menu-link">
                            WATER SAVING
                        </Nav.Link>
                        <Nav.Link as={Link} to="/Gardening" className="menu-link">
                            GARDENING
                        </Nav.Link>
                        <Nav.Link as={Link} to="/Gift" className="menu-link">
                            GIFTS
                        </Nav.Link>
                        <Nav.Link as={Link} to="/Blog" className="menu-link">
                            BLOGS
                        </Nav.Link>
                    </Nav>
                </Container>
            </div>

            <div className="bottom-bar d-flex justify-content-start align-items-center position-relative px-3 py-3">
                <span className="fw-semibold">Trading online since 2001</span>

                <Link
                    to="/"
                    className="fw-semibold text-decoration-none position-absolute start-50 translate-middle-x text-white"
                >
                    NEW ARRIVALS
                </Link>
            </div>
        </header>
    );
}

export default Header;