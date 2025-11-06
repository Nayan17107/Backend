import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Gardening.css";

function Gardening() {
    const categories = [
        { id: 1, title: "Seeds & Soil", img: "/img/gardening-1.jpg" },
        { id: 2, title: "Gardening Accessories", img: "/img/gardening-2.jpg" },
        { id: 3, title: "All natural gardening", img: "/img/gardening-3.jpg" },
        { id: 4, title: "Gifts for Gardeners", img: "/img/gardening-4.jpg" },
    ];

    const products = [
        {
            id: 6,
            img: "/img/gardening-6.jpg",
            title: "Wool Pots - Pack of 10",
            price: "£12.99",
            desc: "Eco-friendly wool pots perfect for seed starting and transplanting.",
            tags: ["BIODEGRADABLE", "ECO-FRIENDLY", "UK MADE"],
        },
        {
            id: 7,
            img: "/img/gardening-7.jpg",
            title: "Flower Tower Vertical Floor Standing Planter",
            price: "£24.99",
            desc: "Grow stunning floral displays vertically with this space-saving planter.",
            tags: ["EASY TO INSTALL", "VIBRANT BLOOMS", "DURABLE"],
        },
        {
            id: 8,
            img: "/img/gardening-8.jpg",
            title: "PlantBlox Vertical Planters - Set of 10",
            price: "£219.00",
            desc: "Create a living wall with these modular PlantBlox planters.",
            tags: ["MODULAR", "SPACE SAVING", "UK MADE"],
        },
        {
            id: 9,
            img: "/img/gardening-9.jpg",
            title: "Rowlinson Small Heritage Planter",
            price: "£79.99",
            desc: "Classic wooden planter for traditional garden design.",
            tags: ["SUSTAINABLE WOOD", "HANDCRAFTED", "PREMIUM QUALITY"],
        },
        {
            id: 10,
            img: "/img/gardening-10.jpg",
            title: "Rowlinson Aston Planter - 2 Pack",
            price: "£70.00",
            desc: "Get double the greenery with this durable wooden planter pair.",
            tags: ["EASY TO INSTALL", "HAPPY PLANTS", "UK MADE"],
        },
    ];

    return (
        <Container fluid className="gardening-wrapper p-0">
            <Container fluid className="gardening-top pt-5 py-4">
                <Row className="g-3 justify-content-center">
                    {categories.map((item) => (
                        <Col
                            key={item.id}
                            xs={12}
                            sm={6}
                            md={3}
                            className="d-flex justify-content-center"
                        >
                            <div className="gardening-card">
                                <img src={item.img} alt={item.title} className="gardening-img" />
                                <div className="gardening-overlay">
                                    <h5>{item.title}</h5>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container className="gardening-text my-5">
                <h2 className="gardening-heading text-center">Gardening</h2>
                <p className="gardening-desc">
                    Browse the complete range of EvenGreener gardening products to assist
                    those green fingers of yours. Whether you're just getting started in
                    the garden, or are a seasoned pro, we have everything you'll need for
                    plenty of successful seasons ahead. Enhance your sustainable lifestyle
                    with any of our watering cans, plant misters, gardening accessories,
                    planters, and much more! Whether you're just getting started in
                    the garden, or are a seasoned pro, we have everything you'll need for
                    plenty of successful seasons ahead.
                </p>
            </Container>

            <Container className="gardening-bottom my-5">
                <Row className="align-items-center">
                    <Col md={6} className="text-section">
                        <h3 className="bottom-title">Pots & Planters</h3>
                        <p className="bottom-desc">
                            Grow your own herbs, veg and much more with these eye-catching
                            garden planters. Perfect for indoor and outdoor use.
                        </p>
                        <Button className="shop-btn">SHOP COLLECTION</Button>
                    </Col>

                    <Col md={6} className="text-center">
                        <img
                            src="/img/gardening-5.jpg"
                            alt="Pots and Planters"
                            className="bottom-img"
                        />
                    </Col>
                </Row>
            </Container>

            <Container fluid className="gardening-container py-5">
                <Row className="g-4">
                    {products.map((item) => (
                        <Col
                            key={item.id}
                            xs={12}
                            sm={6}
                            lg={4}
                            className="d-flex justify-content-center"
                        >
                            <div className="product-card">
                                <img src={item.img} alt={item.title} className="product-img" />
                                <div className="hover-overlay">
                                    <p className="overlay-desc">{item.desc}</p>
                                    <div className="overlay-tags">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="overlay-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Button className="quick-add-btn">Quick Add</Button>
                                </div>
                                <div className="product-info text-center">
                                    <h6 className="product-title">{item.title}</h6>
                                    <p className="product-price">{item.price}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                    <Col xs={12} sm={6} lg={4} className="d-flex justify-content-center">
                        <div className="full-collection-card">
                            <div className="full-collection-content">
                                <h5>View full collection</h5>
                                <Button className="shop-now-btn">SHOP NOW</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Gardening;
