const Card = ({ img, desc, tags, name, price, rating }) => {
    return (
        <div className="product-card">
            <img src={img} alt={name} className="product-image" />

            <div className="hover-overlay">
                <p className="hover-text">{desc}</p>
                <div className="tags">
                    {tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                    ))}
                </div>
                <button className="quick-add-btn">QUICK ADD</button>
            </div>

            <p className="product-name mt-3">{name}</p>
            <p className="price">{price}</p>
            <p className="rating">{rating}</p>
        </div>
    );
};

export default Card;
