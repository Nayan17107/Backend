import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./Food.css";

import img1 from "/img/Food-1.jpg";
import img2 from "/img/Food-2.jpg";
import img3 from "/img/Food-3.jpg";
import img4 from "/img/Food-4.jpg";
import img5 from "/img/Food-5.jpg";
import img6 from "/img/Food-6.jpg";

const FoodWasteComp = () => {
    const products = [
        { id: 1, img: img2, title: "Straight 5 Litre Green Kitchen Caddy", price: "£8.99", reviews: "(3 Reviews)" },
        { id: 2, img: img3, title: "Straight 5 Litre Silver Kitchen Caddy", price: "£8.99", reviews: "(5 Reviews)" },
        { id: 3, img: img4, title: "3 Litre OLIMAX Cooking Oil Recycling Container", price: "£18.99", reviews: "(2 Reviews)" },
        { id: 4, img: img5, title: "Straight 23 Litre Black Caddy", price: "£18.99", reviews: "(2 Reviews)" },
        { id: 5, img: img6, title: "Straight 7 Litre Green Kitchen Caddy", price: "£9.99", reviews: "(4 Reviews)" },
    ];

    return (
        <Container className="fwc-section">
            <Row className="align-items-center mb-5">
                <Col md={6}>
                    <h2 className="fwc-title">Food Waste Caddies and Liners</h2>
                    <p className="fwc-subtext">
                        Compact, easy to use and available in a variety of colours...what’s not to love about our kitchen caddies and liners?
                    </p>
                    <Button className="fwc-btn btn-success">SHOP COLLECTION</Button>
                </Col>
                <Col md={6}>
                    <img src={img1} alt="hero" className="fwc-hero-img" />
                </Col>
            </Row>

            <Row className="g-4">
                {products.map(item => (
                    <Col key={item.id} xs={12} sm={6} lg={4}>

                        <div className="fwc-card">
                            <img src={item.img} className="fwc-img" alt={item.title} />

                            <div className="fwc-overlay">
                                <p className="fwc-overlay-text">
                                    The new range of HOTBIN Mega comes in two huge sizes,
                                    at 450 and 700 litre capacities, taking your ...
                                </p>

                                <div className="fwc-tags">
                                    <span className="fwc-tag">EASY TO SET UP</span>
                                    <span className="fwc-tag">HUGE COMPOST PRODUCTION</span>
                                    <span className="fwc-tag">UK MADE</span>
                                </div>

                                <div className="fwc-line"></div>

                                <button className="fwc-quick-add-btn">QUICK ADD</button>
                            </div>
                        </div>

                        <p className="fwc-name">{item.title}</p>
                        <p className="fwc-price">{item.price}</p>

                        <div className="fwc-info-line">
                            <div className="fwc-dot"></div>
                            <div className="fwc-dot"></div>
                            <div className="fwc-dot"></div>
                            <span className="fwc-size">5L | 7L | 23L</span>

                            <span className="fwc-rating-stars">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </span>

                            <span className="fwc-reviews">{item.reviews}</span>
                        </div>

                    </Col>
                ))}

                <Col xs={12} sm={6} lg={4}>
                    <div className="fwc-cta-card">
                        <p className="fwc-cta-text">View full collection</p>
                        <Button className="fwc-cta-btn">SHOP NOW</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FoodWasteComp;
