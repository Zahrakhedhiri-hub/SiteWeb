import React, { useState, Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { read, listRelated, showComment } from "./apiCore";
import { isAuthenticated } from '../auth';

import { addItem, updateItem, removeItem, addComment } from './cartHelpers';

const Card = ({
    product,

    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined
    // changeCartSize
}) => {
    const [comments, setComments] = useState([]);
    const { token } = isAuthenticated();
    const [comment, setComment] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const [error, seError] = useState(null);

    const onChangeC = (e) => {

        setComment(e.target.value);


    }

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
                </Link>
            )
        );
    };
    const addToCart = () => {
        console.log('added');
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCartBtn = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
                    Add to cart
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
                <span className="badge badge-primary badge-pill">Out of Stock </span>
            );
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };
    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };
    const CommentLink = (
        <Fragment>
            <input type="text" onChange={onChangeC}
                value={comment}
                placeholder="Ajouter un commentaire"></input>
            <button name="ajouter" onClick={() => {
                addComment(product._id, comment)
                window.location = '/cart'


            }}></button>

        </Fragment>

    )
    const ListCommentLink = (

        <Fragment>

        </Fragment>

    )
    return (

        <div className="card ">
            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>
            <div className="card-header card-header-1 ">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
                <p className="card-p black-10">$ {product.price}</p>
                <p className="black-9">Category: {product.category && product.category.description}</p>
                <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                {showStock(product.quantity)}
                {showViewButton(showViewProductButton)}
                {showAddToCartBtn(showAddToCartButton)}
                {/* A testtttttttttttttttttttttttttttttter*/}
                <br />
                {token ? CommentLink : ''}




                {/*Testttttttttttttttttttttttttttttttt */}
                <br />

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;
