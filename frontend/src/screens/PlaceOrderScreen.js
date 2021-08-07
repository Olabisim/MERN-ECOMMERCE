import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrderAction } from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    // Calculate prices

    const addDecimals2 = (num) => {
        return (Math.round(num * 100) / 100 ).toFixed(2)
    }

    const addDecimals4 = (num) => {
        return (Math.round(num * 10000) / 10000 ).toFixed(4)
    } 

    
    cart.itemsPrice = addDecimals4(cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty, 
        0
    ))
    
    // if it $100 then $10
    
    cart.shippingPrice = addDecimals2(cart.itemsPrice > 100 ? 0 : 100)
    
    // 15% tax price
    cart.taxPrice = addDecimals2(Number ((0.15 * cart.itemsPrice)))

    const total = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

    cart.totalPrice = addDecimals4(total)


    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate


    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [success, history])


    const placeOrderHandler = () => {

        dispatch (createOrderAction({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice

        }))

    }


    return (
        <>

            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Address: </strong>

                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.country}
                            </p>

                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <strong>Method: </strong>

                            {

                                cart.paymentMethod 
                                ? 
                                cart.paymentMethod 
                                : 
                                "Payment Method Not Set"

                            }
                        </ListGroup.Item>


                        <ListGroup.Item>

                            <h2>Order Items</h2>

                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (

                                <ListGroup variant='flush'>

                                    {cart.cartItems.map((item, index) => (

                                        <ListGroup.Item key={index}>

                                            <Row>
                                                <Col md={1}>

                                                    <Image src={item.image} alt={item.name} fluid rounded />

                                                </Col>

                                                <Col>
                                                {/* PRODUCT IS THE ID IN THE CART */}
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>

                                                </Col>

                                                <Col md={4}>

                                                    {item.qty} x ${item.price} = ${item.qty * item.price}

                                                </Col>

                                            </Row>



                                        </ListGroup.Item>

                                    ))}

                                </ListGroup>

                            )
                            }

                        </ListGroup.Item>



                    </ListGroup>

                </Col>

                <Col md={4}>
                    
                    <Card>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>

                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>

                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>

                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>

                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>

                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>

                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>

                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>

                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block' 
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}>
                                        Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>

                </Col>


            </Row>
            
        </>
    )
}

export default PlaceOrderScreen
