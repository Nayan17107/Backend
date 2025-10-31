import "./Home.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaHandshake } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import img1 from "/img/home-1.jpg";
import img2 from "/img/home-2.jpg";
import img3 from "/img/home-3.jpg";
import img4 from "/img/garden-logo.png";
import img5 from "/img/stool.png";

function Home() {
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
                            <Col sm={6} lg={4}>
                                <div className="product-card">
                                    <img src={img1} alt="Tumbler" className="product-image" />

                                    <div className="hover-overlay">
                                        <p className="hover-text">
                                            Complete with two composting chambers, air vents and a reinforced
                                            barrel, the sturdy Maze Compost Tumbler keeps things fresh…
                                        </p>
                                        <div className="tags">
                                            <span>EASY TO USE</span>
                                            <span>INNOVATIVE</span>
                                            <span>MODERN</span>
                                        </div>
                                        <button className="quick-add-btn">QUICK ADD</button>
                                    </div>

                                    <p className="product-name mt-3">Maze 245 Litre Compost Tumbler</p>
                                    <p className="price">£239.99</p>
                                    <p className="rating">★★★★★ <span>(5 Reviews)</span></p>
                                </div>
                            </Col>

                            <Col sm={6} lg={4}>
                                <div className="product-card">
                                    <img src={img2} alt="Composter" className="product-image" />

                                    <div className="hover-overlay">
                                        <p className="hover-text">
                                            A powerful food waste composter designed for all-year-round efficiency.
                                        </p>
                                        <div className="tags">
                                            <span>SMART</span>
                                            <span>ECO-FRIENDLY</span>
                                            <span>STRONG</span>
                                        </div>
                                        <button className="quick-add-btn">QUICK ADD</button>
                                    </div>

                                    <p className="product-name mt-3">Green Johanna Food Waste Composter</p>
                                    <p className="price">£124.99</p>
                                    <p className="rating">★★★★★ <span>(3 Reviews)</span></p>
                                </div>
                            </Col>

                            <Col sm={6} lg={4}>
                                <div className="product-card">
                                    <img src={img3} alt="Water Butt" className="product-image" />

                                    <div className="hover-overlay">
                                        <p className="hover-text">
                                            Save rainwater effortlessly with durable, space-saving storage.
                                        </p>
                                        <div className="tags">
                                            <span>WATER SAVER</span>
                                            <span>GREEN</span>
                                            <span>DOUBLE KIT</span>
                                        </div>
                                        <button className="quick-add-btn">QUICK ADD</button>
                                    </div>

                                    <p className="product-name mt-3">
                                        Mini Rainsaver 100 Litre Green Water Butt Double Kit
                                    </p>
                                    <p className="price">£99.99</p>
                                    <p className="rating">★★★★★ <span>(65 Reviews)</span></p>
                                </div>
                            </Col>
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