import React from "react";
import "./Water.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import water6 from "/img/water-6.jpg";

function WaterPage() {
    const categories = [
        { id: 1, title: "All Water Butts & Tanks", img: "/img/water-1.jpg" },
        { id: 2, title: "Bestsellers", img: "/img/water-2.jpg" },
        { id: 3, title: "Water Tanks", img: "/img/water-3.jpg" },
        { id: 4, title: "Decorative Water Butts", img: "/img/water-4.jpg" },
        { id: 5, title: "Accessories", img: "/img/water-5.jpg" }
    ];

    const products = [
        {
            id: 1,
            img: "/img/water-7.jpg",
            title: "Ibiza 300 litre Water Butt Kit",
            price: "£132.99",
            isNew: true,
            features: ["Contemporary Design", "Durable Material", "Huge Water Saving"],
            desc: "The Ibiza 300 litre Water Butt Kit offers a practical and modern solution for collecting rainwater.",
        },
        {
            id: 2,
            img: "/img/water-8.jpg",
            title: "FreshaTank Microbial Disc",
            price: "£19.99",
            features: ["Stops Bacteria", "Clean Water", "Easy to Use"],
            desc: "Keep your water safe, clean, and fresh using this long-lasting antimicrobial disc.",
        },
        {
            id: 3,
            img: "/img/water-9.jpg",
            title: "ButtinaBox 200 Litre Water Butt Kit",
            price: "£79.99",
            oldPrice: "£99.99",
            features: ["Compact Design", "UV Resistant", "Budget Friendly"],
            desc: "Affordable and compact rainwater storage designed to fit small garden spaces.",
        },
        {
            id: 4,
            img: "/img/water-10.jpg",
            title: "Strata 250 Litre Slimline Water Butt Kit",
            price: "£84.99",
            features: ["Slimline", "Strong Build", "Large Capacity"],
            desc: "Perfect for limited outdoor areas while storing plenty of water.",
        },
        {
            id: 5,
            img: "/img/water-11.jpg",
            title: "276 Litre Wall Tank",
            price: "£139.99",
            oldPrice: "£189.99",
            features: ["Wall Mounted", "Rain Trap", "Space Saving"],
            desc: "Wall-mounted tank with efficient rain trap system — great for small yards.",
        },
    ];

    return (
        <div className="water-page py-4">
            <Container>
                <Row className="mb-5">
                    <Col xs={12}>
                        <div className="categories-row">
                            {categories.map((c) => (
                                <div className="category-card" key={c.id}>
                                    <div
                                        className="category-bg"
                                        style={{ backgroundImage: `url(${c.img})` }}
                                    >
                                        <div className="category-overlay">
                                            <span className="category-title">{c.title}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>

                <Row className="align-items-start mb-5">
                    <Col xs={12}>
                        <h2 className="section-title">Water Saving</h2>
                        <p className="section-text">
                            Every drop counts. Using rainwater to hydrate your plants not only saves money but also helps protect the environment by reducing reliance on mains water. Water-saving systems allow you to capture, store, and reuse rainwater efficiently — giving your garden the moisture it needs even during dry spells. Start conserving today and grow a garden that’s both beautiful and sustainable.
                        </p>
                    </Col>
                </Row>

                <Row className="bestselling-row align-items-center">
                    <Col xs={12} md={6} lg={5} className="order-2 order-md-1 bestselling-left">
                        <h3 className="sub-title">Bestselling Water Butts</h3>
                        <p className="small-desc">
                            UK-made from recycled plastic and backed by a 5-year guarantee.
                        </p>
                        <Button className="shop-btn btn-success">SHOP COLLECTION</Button>
                    </Col>

                    <Col xs={12} md={6} lg={7} className="order-1 order-md-2 bestselling-right">
                        <img src={water6} alt="Water Butt" className="hero-img-fix" />
                    </Col>
                </Row>

                <div className="water-products py-5">
                    <Row className="g-4">
                        {products.map((item) => (
                            <Col key={item.id} md={4} sm={6} xs={12}>
                                <div className="product-card">
                                    {item.isNew && <span className="badge-new">NEW!</span>}

                                    <img src={item.img} alt={item.title} className="product-img" />

                                    <div className="product-info">
                                        <p className="product-title">{item.title}</p>
                                        <p className="product-price">
                                            {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
                                            {item.price}
                                        </p>
                                    </div>

                                    <div className="hover-layer">
                                        <p className="hover-desc">{item.desc}</p>
                                        <div className="hover-features">
                                            {item.features.map((f, i) => (
                                                <span key={i} className="feature-chip">{f}</span>
                                            ))}
                                        </div>
                                        <Button className="quick-add-btn btn-success">QUICK ADD</Button>
                                    </div>
                                </div>
                            </Col>
                        ))}

                        <Col md={4} sm={6} xs={12}>
                            <div className="view-collection-card">
                                <h3>View full collection</h3>
                                <Button className="view-btn btn-light">SHOP NOW</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default WaterPage;
