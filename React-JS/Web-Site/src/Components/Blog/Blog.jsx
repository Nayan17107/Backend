import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaHandshake } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";

import img1 from "/img/garden-6.jpg";
import img2 from "/img/blog-3.jpg";
import img3 from "/img/blog-2.jpg";
import img4 from "/img/blog-4.jpg";
import img5 from "/img/blog-5.jpg";
import img6 from "/img/blog-6.jpg";

function Blog() {
    const promos = [
        {
            id: 1,
            title: "Compost Converter",
            desc: "Turn garden waste into rich compost quickly.",
            img: img1,
            cta: "Shop Now"
        },
        {
            id: 2,
            title: "Garden Tools",
            desc: "Durable tools that make gardening enjoyable.",
            img: img2,
            cta: "Explore"
        },
        {
            id: 3,
            title: "Planters & Pots",
            desc: "Beautiful planters for every corner of your home.",
            img: img3,
            cta: "See More"
        },
        {
            id: 4,
            title: "Seeds & Bulbs",
            desc: "Seasonal seeds to start your next project.",
            img: img4,
            cta: "Buy Seeds"
        },
        {
            id: 5,
            title: "Outdoor Decor",
            desc: "Style your garden with elegant accessories.",
            img: img5,
            cta: "Discover"
        },
        {
            id: 6,
            title: "Watering & Care",
            desc: "Everything you need to keep plants healthy.",
            img: img6,
            cta: "Shop Watering"
        },
    ];

    return (
        <section className="promo-section py-5">
            <Container>
                <Row className="align-items-center mb-4">
                    <Col md={6} className="mb-3 mb-md-0">
                        <h2 className="promo-title">Garden Essentials</h2>
                        <p className="promo-subtext">
                            Curated tools, planters and supplies to make your garden thrive — handpicked for quality and value.
                        </p>
                        <div className="d-flex gap-2">
                            <Button variant="success" className="me-2">
                                <FaShoppingBag className="me-2" /> Shop All
                            </Button>
                            <Button variant="outline-success">
                                <FaHandshake className="me-2" /> Services
                            </Button>
                        </div>
                    </Col>

                    <Col md={6} className="text-md-end text-start">
                        <small className="text-muted">Free delivery over $2,999 • 30-day returns</small>
                    </Col>
                </Row>

                <Row className="g-3">
                    {promos.map((p) => (
                        <Col key={p.id} lg={4} md={6} sm={12}>
                            <article className="promo-card position-relative overflow-hidden rounded-3">
                                <div className="promo-img-wrap">
                                    <img src={p.img} alt={p.title} className="promo-product-img w-100" />
                                    <div className="hover-layer d-flex flex-column justify-content-center align-items-center">
                                        <h5 className="mb-2">{p.title}</h5>
                                        <p className="small px-3">{p.desc}</p>
                                        <Button size="sm" variant="light" className="mt-2">
                                            {p.cta}
                                        </Button>
                                    </div>
                                </div>

                                <div className="promo-card-body p-3 text-center">
                                    <h6 className="mb-2">{p.title}</h6>
                                    <p className="mb-0 small text-muted fs-6">{p.desc}</p>
                                </div>
                            </article>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default Blog;
