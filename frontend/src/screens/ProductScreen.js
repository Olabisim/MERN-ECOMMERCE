import React, { useState, useEffect } from "react";
// import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import products from "../products";

// const {match } = props

const ProductScreen = ({ history, match }) => {
    // the params.id is passed from the App.js the names must be equal with the one at app.js
    // e.g params.id /products/:id

    // const product = products.find((p) => p._id === match.params.id);

    //because product is an object [] is changed to {}
    // const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    // state.productDetails is reducer from globla store
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    console.log(match.params.id);
    useEffect(() => {
        // console.log('something')
        console.log(dispatch(listProductDetails(match.params.id)));

        // const fetchProduct = async () => {

        // const { data } = res
        // const {data} = await axios.get(`/api/products/${match.params.id}`)

        // setProduct(data)

        // }

        // fetchProduct()
    }, [dispatch, match]);

    const addToCartHandler = () => {
        // redirect
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className="btn my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                 <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={6}>
                            {/* the meaning of fluid is to keep the pic front passing it's container */}

                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description: ${product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price: </Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: </Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn-block"
                                            type="button"
                                            disabled={product.countInStock <= 0}
                                        >
                                             Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
