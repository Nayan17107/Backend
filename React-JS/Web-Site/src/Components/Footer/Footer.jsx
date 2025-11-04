import { Container, Row, Col } from "react-bootstrap";
import {
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

import { SiKlarna, SiGooglepay, SiShopify, SiApplepay } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import "./Footer.css";
import logo from "../../../img/logo.png";

const Footer = () => {
    return (
        <footer className="footer-section">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <img
                            src={logo}
                            alt="EvenGreener Logo"
                            className="footer-logo"
                        />
                    </Col>
                </Row>

                <Row className="footer-top">
                    <Col md={2} sm={6} xs={12} className="footer-col">
                        <h6>SHOP</h6>
                        <ul>
                            <li>Bestsellers</li>
                            <li>Composters</li>
                            <li>Water Butts</li>
                        </ul>
                    </Col>

                    <Col md={2} sm={6} xs={12} className="footer-col">
                        <h6>GOOD TO KNOW</h6>
                        <ul>
                            <li>About Us</li>
                            <li>Bulk Enquiries</li>
                            <li>Customer Reviews</li>
                        </ul>
                    </Col>

                    <Col md={2} sm={6} xs={12} className="footer-col">
                        <h6>CONNECT</h6>
                        <ul>
                            <li><FaFacebookF /> Facebook</li>
                            <li><FaInstagram /> Instagram</li>
                            <li><FaYoutube /> YouTube</li>
                        </ul>
                    </Col>

                    <Col md={2} sm={6} xs={12} className="footer-col">
                        <h6>ACCOUNT</h6>
                        <ul>
                            <li>Manage Account</li>
                            <li>Orders & Returns</li>
                        </ul>
                    </Col>

                    <Col md={2} sm={6} xs={12} className="footer-col">
                        <h6>POLICIES</h6>
                        <ul>
                            <li>T&Cs</li>
                            <li>Cookie Policy</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </Col>

                    <Col md={2} sm={6} xs={12} className="footer-col">
                        <h6>SUPPORT</h6>
                        <ul>
                            <li>Contact Us</li>
                            <li>Help Centre</li>
                            <li>Delivery & Returns</li>
                            <li>Blogs & Guides</li>
                        </ul>
                    </Col>
                </Row>

                <Row className="footer-contact">
                    <Col md={4} sm={12}>
                        <h6>GET IN TOUCH</h6>
                        <p>
                            <strong>Email <HiOutlineMail className="email-icon" />
                            </strong>
                            <br />
                            customer.care@evengreener.com
                        </p>
                    </Col>
                </Row>

                <hr />

                <Row className="footer-bottom align-items-center">
                    <Col md={6} sm={12}>
                        <p>© 2025 EvenGreener. All Rights Reserved.</p>
                    </Col>
                    <Col
                        md={6}
                        sm={12}
                        className="d-flex justify-content-md-end justify-content-center payment-icons"
                    >
                        <FaCcAmex />
                        <SiApplepay />
                        <SiGooglepay />
                        <SiKlarna />
                        <FaCcMastercard />
                        <FaCcVisa />
                        <SiShopify />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
