import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Garden.css";

function Garden() {
    const categories = [
        { id: 1, title: "Bokashi", img: "/img/garden-1.jpg" },
        { id: 2, title: "Accessories", img: "/img/garden-2.jpg" },
        { id: 3, title: "Food Waste", img: "/img/garden-3.jpg" },
        { id: 4, title: "Large Composters", img: "/img/garden-4.jpg" },
        { id: 5, title: "Garden Soil", img: "/img/garden-5.jpg" },
        { id: 6, title: "Hot Composters", img: "/img/garden-6.jpg" },
        { id: 7, title: "Kitchen Caddies", img: "/img/garden-7.jpg" },
        { id: 8, title: "Indoor Bins", img: "/img/garden-8.jpg" },
        { id: 9, title: "Recycling Tools", img: "/img/garden-9.jpg" },
        { id: 10, title: "Eco Essentials", img: "/img/garden-10.jpg" },
    ];

    return (
        <>
            <Container>
                <div className="my-5 text-start composting-info">
                    <h2>Composting</h2>
                    <p>
                        Want to learn how to start composting? You&apos;ve come to the right place.
                        At EvenGreener, we pride ourselves in being compost experts.
                    </p>
                    <p>
                        Have a browse of our wide range of products, and find the right one for
                        your garden. Check out our composting guides which are packed with
                        information to help you get started on your composting journey!
                    </p>
                </div>

                <div className="py-5">
                    <Row className="g-4 categories-row">
                        {categories.map((item) => (
                            <Col xs={12} sm={6} lg={4} key={item.id}>
                                <div className="compost-card">
                                    <img src={item.img} alt={item.title} />
                                    <div className="overlay">
                                        <h5 className="overlay-text">{item.title}</h5>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

                <div className="hot-section py-5">
                    <Row className="align-items-center g-4">
                        <Col xs={12} md={4}>
                            <h3>Hot Composters</h3>
                            <p>
                                Want to know how to produce rich, nutrient dense compost in 1-3
                                months? Hot composting is the way forward.
                            </p>
                            <Button className="hot-btn btn-success">SHOP COLLECTION</Button>
                        </Col>
                        <Col xs={12} md={8}>
                            <img
                                src="/img/garden-5.jpg"
                                alt="Hot Composting"
                                className="img-fluid rounded"
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}

export default Garden;
