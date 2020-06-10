import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated, showComment } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
    const [comments, setComments] = useState([]);
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const getCommentByProdunct = (productId) => {
        showComment(productId).then((data) => {
            setComments(data);
            console.log("Comments in View ", product);
        })
    }
    const loadSingleProduct = (productId) => {
        read(productId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {

                setProduct(data);
                // fetch related products
                getCommentByProdunct(data._id);
                listRelated(data._id).then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data.products);
                    }
                });

            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={
                product && product.description && product.description.substring(0, 100)
            }
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}

                    {comments.map(({ _id, text }) => (
                        <li>{text}redigé par </li>
                    ))}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;
