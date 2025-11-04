import "./Home.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaHandshake } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import img1 from "/img/home-1.jpg";
import img2 from "/img/home-2.jpg";
import img3 from "/img/home-3.jpg";
import img4 from "/img/garden-logo.png";
import img5 from "/img/plant.jpg";
import Card from "../Card Component/Card";

function Home() {
    const productCard = [
        {
            id: 1,
            img: img1,
            desc: "Great compost tumbler for small gardens.",
            tags: ['EASY TO USE', 'INNOVATIVE', 'MODERN'],
            name: "Maze 245 Litre Compost Tumbler",
            price: "£239.99",
            rating: "★★★★★ (5 Reviews)"
        },
        {
            id: 2,
            img: img2,
            desc: "Compact, easy to turn.",
            tags: ['SMART', 'ECO-FRIENDLY', 'STRONG'],
            name: "Mini Compost Tumbler 120L",
            price: "£129.50",
            rating: "★★★★☆ (12 Reviews)"
        },
        {
            id: 3,
            img: img3,
            desc: "Large capacity for bigger gardens.",
            tags: ['WATER SAVER', 'GREEN', 'DOUBLE KIT'],
            name: "Pro Compost 400L",
            price: "£349.00",
            rating: "★★★★☆ (22 Reviews)"
        },
    ];

    return (
        <div className="shop-category-wrapper pt-5">
            <Container>

                <div className="hero-banner">
                    <div className="hero-content">
                        <h1 className="hero-title">Sustainable Solutions for a Greener Garden</h1>
                        <p className="hero-subtext">
                            Explore our range of eco-friendly gardening products and start your journey towards a greener tomorrow.
                        </p>
                        <Button className="hero-btn btn-success">SHOP NOW</Button>
                    </div>

                    <div className="hero-image-wrapper">
                        <img src="/img/stool.png" alt="Compost Bin" className="hero-image" />
                    </div>
                </div>

                <div className="support-section mt-5">
                    <div className="support-item">
                        <FaHandshake className="support-icon" />
                        <div>
                            <h5 className="support-title">Service You Can Count On</h5>
                            <p className="support-text">Our Customer Care Team is here to help.</p>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="support-item">
                        <FaShoppingBag className="support-icon" />
                        <div>
                            <h5 className="support-title">Our Bestsellers</h5>
                            <p className="support-text">Are made from recycled plastic.</p>
                        </div>
                    </div>
                </div>

                <Row className="best-seller-section">
                    <Col md={3} className="d-flex flex-column justify-content-center">
                        <h2 className="bestseller-title">Other People Love Those</h2>
                        <p className="bestseller-subtitle">Discover our bestsellers</p>
                        <Button className="shop-btn btn-success">SHOP NOW</Button>
                    </Col>

                    <Col md={9}>
                        <Row className="g-4">
                            {productCard.map(product => (
                                <Col key={product.id} sm={6} lg={4}>
                                    <Card
                                        img={product.img}
                                        desc={product.desc}
                                        tags={product.tags}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

            <div className="compost-promo-wrapper">
                <div className="compost-promo-inner">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-4 col-md-12 promo-left">
                            <div className="promo-badge">
                                <img src={img4} alt="badge" />
                                <span className="badge-text">BEST BUY</span>
                            </div>

                            <h2 className="promo-heading">
                                Voted the best 'BUDGET BUY' <br /> in Gardeners' World Magazine
                            </h2>

                            <a href="#" className="promo-link">GET YOURS NOW</a>
                        </div>

                        <div className="col-lg-4 col-md-12 promo-center text-center">
                            <img
                                src={img5}
                                alt="Compost Converter"
                                className="promo-product-img"
                            />
                        </div>

                        <div className="col-lg-4 col-md-12 promo-right">
                            <h5 className="product-title">Blackwall 220 Litre Black Compost Converter.</h5>

                            <p className="product-desc">
                                With 3+ million sold to date, this is the UK's best-selling compost bin, and for a reason.
                                Expertly designed for simple use, transform all organic waste into nutritious, valuable
                                feed to enrich your soil and nurture your garden.
                            </p>

                            <a href="#" className="btn btn-outline-light promo-cta">SHOP PRODUCT</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog-wrapper py-5">
                <Container>
                    <Row className="align-items-center g-5">

                        <Col md={4}>
                            <p className="blog-subtitle">FROM THE BLOG</p>

                            <h3 className="blog-heading">
                                Helping you lead an <br /> EvenGreener lifestyle
                            </h3>

                            <Button className="view-blog-btn">VIEW BLOG</Button>
                        </Col>

                        <Col md={8}>
                            <Row className="g-4">

                                <Col md={6}>
                                    <img src="/img/blog-1.jpg" className="blog-img" alt="Blog 1" />
                                    <h5 className="blog-card-title">
                                        Turn autumn leaves into nutritious leaf mould
                                    </h5>
                                    <p className="blog-text">
                                        Why let fallen leaves go to waste when you could easily turn them into food for your garden?
                                    </p>
                                </Col>

                                <Col md={6}>
                                    <img src="/img/blog-2.jpg" className="blog-img" alt="Blog 2" />
                                    <h5 className="blog-card-title">
                                        3 easy steps to a green Halloween
                                    </h5>
                                    <p className="blog-text">
                                        Every year Halloween brings horror stories about the millions of pumpkins that end up in landfill or incineration.
                                        But it's easy to become a Halloween hero!
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <div className="seen-in-section text-center mt-5">
                        <span className="seen-in-text">AS SEEN IN</span>
                        <div className="logos-group mt-3 d-flex justify-content-center gap-4">
                            <img src="/img/bcc-logo.png" alt="BBC" className="seen-logo" />
                            <img src="/img/gworld-logo.png" alt="Gardeners World" className="seen-logo" />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;