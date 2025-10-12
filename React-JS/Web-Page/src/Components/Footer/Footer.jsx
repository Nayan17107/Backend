import { Button, Col, Form, Row, InputGroup, Container } from "react-bootstrap"
import {
    FaInstagram,
    FaXTwitter,
    FaFacebook,
    FaYoutube,
} from "react-icons/fa6";

import './Footer.css'
import visa from '/Img/visa.svg'
import master from '/Img/mastercard.svg'
import amex from '/Img/amex.svg'
import paypal from '/Img/paypal.svg'
import diners from '/Img/diners.svg'
import discover from '/Img/discover.svg'

const Footer = () => {
    return (
        <footer className="bg-light text-dark py-5 px-4">
            <Row className="px-5 px-lg-0">
                <Col sm={6} lg={4} xl={3} className="mb-4 pe-5 ">
                    <h5>Company</h5>
                    <p className="pe-5">Find a location nearest you. See <strong>Our Stores</strong></p>
                    <p><strong>+391 (0)35 2568 4593</strong></p>
                    <p>hello@domain.com</p>
                </Col>

                <Col sm={6} lg={4} xl={3} className="mb-4">
                    <h5>Useful Links</h5>
                    <ul className="list-unstyled">
                        <li>New Products</li>
                        <li>Best Sellers</li>
                        <li>Bundle & Save</li>
                        <li>Online Gift Card</li>
                    </ul>
                </Col>

                <Col sm={6} lg={4} xl={3} className="mb-4">
                    <h5>Information</h5>
                    <ul className="list-unstyled">
                        <li>Start A Return</li>
                        <li>Contact Us</li>
                        <li>Shipping FAQ</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </Col>

                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <h5>Good emails.</h5>
                    <p>Enter your email below to be the first to know about new collections and product launches.</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Enter your email address"
                            aria-label="Email"
                        />
                        <Button variant="dark" id="button-subscribe">
                            Subscribe
                        </Button>
                    </InputGroup>
                </Col>
            </Row>



            <Row className="align-items-center pt-5">
                <Col md={4} className="text-center text-md-start mb-2 mb-md-0">
                    <small className="me-3">© Glowing 2025 | Powered by Shopify</small>
                    <span className="me-2"><FaInstagram className="fs-5" /></span>
                    <span className="me-2"><FaXTwitter className="fs-5" /></span>
                    <span className="me-2"><FaFacebook className="fs-5" /></span>
                    <span className="me-2"><FaYoutube className="fs-5" /></span>
                </Col>

                <Col md={4} className="text-center mb-2 mb-md-0">
                    <h3 className="mb-0 fs-1 ">GLOWING</h3>
                </Col>

                <Col md={4} className="text-center text-md-end">
                    <span className="ms-2">
                        <img src={visa} alt="" width="35px" />
                    </span>
                    <span className="ms-2">
                        <img src={master} alt="" width="35px" />

                    </span>
                    <span className="ms-2">
                        <img src={amex} alt="" width="35px" />

                    </span>
                    <span className="ms-2">
                        <img src={paypal} alt="" width="35px" />

                    </span>
                    <span className="ms-2">
                        <img src={diners} alt="" width="35px" />

                    </span>
                    <span className="ms-2">
                        <img src={discover} alt="" width="35px" />

                    </span>
                </Col>
            </Row>
        </footer>

    )
}

export default Footer
