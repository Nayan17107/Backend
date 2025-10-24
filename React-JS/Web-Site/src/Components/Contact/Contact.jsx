import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="newsletter-section">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col md={8} lg={6}>
                        <h2 className="newsletter-title">
                            Join our <span className="highlight">EvenGreener Gang!</span>
                        </h2>
                        <p className="newsletter-text">
                            Sign up for discounts, product updates, composting and water saving tips, and much more.
                        </p>

                        <Form className="d-flex newsletter-form mx-auto">
                            <Form.Control
                                type="email"
                                placeholder="Email address"
                                className="newsletter-input"
                            />
                            <Button variant="outline-light" className="newsletter-btn">
                                SUBSCRIBE
                            </Button>
                        </Form>

                        <div className="social-icons mt-4">
                            <a href="#" className="icon-link"><FaFacebookF /></a>
                            <a href="#" className="icon-link"><FaInstagram /></a>
                            <a href="#" className="icon-link"><FaPinterestP /></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Contact;
