import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaLeaf, FaUsers } from "react-icons/fa";
import "./Gift.css";
import img from "/img/gift-logo.jpg";
import gift1 from "/img/gift-1.jpg";
import gift2 from "/img/gift-2.jpg";
import gift3 from "/img/gift-3.jpg";
import gift4 from "/img/gift-4.jpg";
import gift5 from "/img/gift-5.jpg";
import gift6 from "/img/gift-6.jpg";
import gift7 from "/img/gift-7.jpg";
import gift8 from "/img/gift-8.jpg";

const products = [
    {
        id: 1,
        name: "Wool Tumble Dryer Balls",
        price: "£17.99",
        img: gift1,
        tags: ["Soft Fabric", "Eco Friendly", "Reusable"],
        desc: "Make laundry day more sustainable with these handmade wool dryer balls.",
    },
    {
        id: 2,
        name: "Seedball Italian Herb Kitchen",
        price: "£15.00",
        img: gift2,
        tags: ["Beautiful Gift", "Easy Growing", "Sleek Design"],
        desc: "Grow fresh basil, parsley, and oregano effortlessly with Seedball kits.",
    },
    {
        id: 3,
        name: "Seedball Wildflower Tube - Poppy",
        price: "£7.99",
        img: gift3,
        tags: ["Wildflowers", "Pollinator Friendly", "UK Made"],
        desc: "Brighten your garden with vibrant poppies while helping bees thrive.",
    },
    {
        id: 4,
        name: "Stylish Green Wormery Bin",
        price: "£69.99",
        img: gift4,
        tags: ["Eco Composting", "Odour Free", "Durable"],
        desc: "A compact and modern compost bin that turns waste into garden gold.",
    },
    {
        id: 5,
        name: "Self-Watering Olla Pot",
        price: "£19.50",
        img: gift5,
        tags: ["Water Saving", "Handmade", "Natural Look"],
        desc: "Beautiful ceramic pot for steady plant hydration and easy maintenance.",
    },
    {
        id: 6,
        name: "Growbar Strawberry Kit",
        price: "£12.00",
        img: gift6,
        tags: ["Fun Gift", "Family Friendly", "Organic"],
        desc: "Grow juicy strawberries easily — perfect for beginners and kids.",
    },
    {
        id: 7,
        name: "Vertical Plant Tower",
        price: "£39.99",
        img: gift7,
        tags: ["Space Saver", "Modern Design", "Strong Build"],
        desc: "Grow herbs or flowers vertically with this stylish and sturdy tower.",
    },
    {
        id: 8,
        name: "Compost Caddy & Bin Set",
        price: "£45.00",
        img: gift8,
        tags: ["Odour Control", "Easy Cleaning", "Garden Essential"],
        desc: "Keep your kitchen and garden eco-friendly with this compost caddy set.",
    },
];

function Gift() {
    return (
        <Container fluid className="p-0">
            <section className="gift-section mb-5">
                <Row className="align-items-center g-0">
                    <Col md={6} className="gift-img-container">
                        <img
                            src={img}
                            alt="Gifts for Gardeners"
                            className="img-fluid gift-image"
                        />
                    </Col>

                    <Col md={6} className="gift-content px-5 py-4">
                        <h2 className="gift-title fw-bold mb-3">
                            Gifts for Gardeners
                        </h2>
                        <p className="gift-text mb-3">
                            In need of the perfect gift for a fellow gardener, or
                            just want to treat yourself with something fabulous?
                            Look no further!
                        </p>
                        <p className="gift-text mb-4">
                            From beautiful Ollas to help with watering your pots
                            to stylish wormeries to feature in any space, we
                            have something for all budgets and tastes.
                        </p>

                        <div className="gift-feature d-flex align-items-center mb-3">
                            <FaUsers className="me-3 gift-icon" />
                            <span className="gift-feature-text fw-semibold">
                                Perfect For All Levels Of Gardeners
                            </span>
                        </div>

                        <div className="gift-feature d-flex align-items-center">
                            <FaLeaf className="me-3 gift-icon" />
                            <span className="gift-feature-text fw-semibold">
                                Climate Positive Products
                            </span>
                        </div>
                    </Col>
                </Row>
            </section>

            <section className="gift-intro text-center py-5">
                <Container>
                    <h2 className="gift-intro-title fw-bold mb-3">
                        Thoughtful Gifts for Every Gardener
                    </h2>
                    <p className="gift-intro-text mx-auto">
                        Whether you’re searching for the perfect present for a plant
                        enthusiast or simply adding something special to your own
                        garden space, our collection is filled with eco-friendly and
                        beautifully designed products.
                        <br />
                        Each item is chosen with love, care, and sustainability in mind.
                    </p>
                </Container>
            </section>

            <section className="gift-products p-5">
                <Row className="gy-4">
                    {products.map((item) => (
                        <Col
                            key={item.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            className="gift-card-col"
                        >
                            <div className="gift-card">
                                <div className="gift-product-img-container">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="img-fluid gift-img"
                                    />
                                    <div className="gift-hover">
                                        <p className="gift-desc">
                                            {item.desc.length > 100
                                                ? item.desc.slice(0, 100) + "..."
                                                : item.desc}
                                        </p>
                                        <hr className="gift-line" />
                                        <div className="gift-tags">
                                            {item.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="gift-tag"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Button
                                            className="gift-btn btn-success"
                                        >
                                            QUICK ADD
                                        </Button>
                                    </div>
                                </div>
                                <div className="gift-info mt-2">
                                    <h6 className="gift-name">{item.name}</h6>
                                    <p className="gift-price fw-semibold">
                                        {item.price}
                                    </p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>
        </Container>
    );
}

export default Gift;
