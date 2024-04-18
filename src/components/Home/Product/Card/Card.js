import React, { useEffect, useState } from "react";
import "./Card.scss";
import Product from "../../../../api/product/product_api";

function Card() {
    console.log(Product);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        setProduct(Product);

        console.log(product);
    }, []);

    return (
        <div className="card_container">
            {product.map((product, index) => (
                <div className="card" key={index}>
                    <img src={product.image} alt={product.name} />
                    <div className="card_body">
                        <h5 className="card_title">{product.name}</h5>
                        <p className="card_text">{product.description}</p>
                        <p className="card_price">${product.price}</p>
                        <button className="btn btn_primary">Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
