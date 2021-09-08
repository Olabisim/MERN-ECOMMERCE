import React, { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetailsAction, payOrderAction, deliverOrderAction } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({match, history}) => {

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    console.log('orderDetails')
    console.log(orderDetails)

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading) {

        // Calculate prices
        // ITEMS PRICE IS NOT EVEN STORED
        // ORDER.ITEMSPRICE IS NOT WORKING THAT IS WHY WE FETCHED FROM SOMEWHERE ELSE
        // WE PERFORMED THIS CALCULATION FROM SOMEWHERE ELSE

        const addDecimals2 = (num) => {
            return (Math.round(num * 100) / 100 ).toFixed(2)
        }

        
        order.itemsPrice = addDecimals2(order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty, 
            0
        ))
        console.log(order)

        // end calculate prices

    }

    useEffect(() => {

        if(!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {

            const {data: clientId} = await axios.get('/api/config/paypal')
            // he renamed the data gotten from res.data to clientId
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src= `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)

        }


        // check for the order and also make sure that the order ID matches the ID in the URL
        
        if(!order || order._id !== orderId || successPay || successDeliver ) {

            // order pay reset to avoid unending lopp
            // once you pay it's gonna keep refreshing
            // to avoid unending loop reset order pay to empty
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetailsAction(orderId))

        }
        // if the order is not paid

        else if (!order.isPaid) {

            // if window.paypal is not showing 
            // show it 
            // if it showing 
            // dont show again
            // if the paypal script is not there
            if(!window.paypal) {
                addPayPalScript()
            }
            else {
                // sdkReady is for toggling of paypal button
                setSdkReady(true)
            }
        }

    }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo])

    // this exactly from paypal takes in 
    const successPaymentHandler = (paymentResult) => {

        console.log(paymentResult)
        dispatch(payOrderAction( orderId, paymentResult ))

    }


    const deliverHandler = () => {

        dispatch(deliverOrderAction(order))

    }

    return (
        <>

            {
                
            loading 
            ? 
            <Loader /> 
            : 
            error 
            ? 
            <Message variant='danger'>
                {error}
            </Message>
            : 
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>

                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>

                                <p>

                                    <strong>Name: </strong> {order.user.name}
                                    
                                </p>

                                <p>

                                    <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>

                                </p>


                          
                                <p>
                                    <strong>Address: </strong>

                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city}{' '}
                                    {order.shippingAddress.postalCode}, {' '}
                                    {order.shippingAddress.country}
                                </p>

                                {
                                order.isDelivered ? (
                                    <Message variant='success'>
                                        Delivered on {order.deliveredAt}
                                    </Message>
                                )
                                : 
                                (
                                    <Message variant='danger'> Not Delivered</Message>
                                )
                            
                                }
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <h2>Payment Method</h2>

                                <p>

                                    <strong>Method: </strong>

                                    {

                                        order.paymentMethod 
                                        ? 
                                        order.paymentMethod 
                                        : 
                                        "Order Is Not Set"

                                    }

                                </p>
                                
                                {
                                order.isPaid ? (
                                    <Message variant='success'>
                                        Paid on   
                                        { order.PaidAt }
                                        {/* {

                                           !loading && order.createdAt
                                        } */}
                                    </Message>
                                )
                                : 

                                (
                                    <Message variant='danger'> Not Paid</Message>
                                )
                            
                                }

                            </ListGroup.Item>


                            <ListGroup.Item>

                                <h2>Order Items</h2>

                                {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (

                                    <ListGroup variant='flush'>

                                        {order.orderItems.map((item, index) => (

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
                                        <Col>${order.itemsPrice}</Col>

                                    </Row>

                                </ListGroup.Item>

                                <ListGroup.Item>

                                    <Row>

                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>

                                    </Row>

                                </ListGroup.Item>

                                <ListGroup.Item>

                                    <Row>

                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>

                                    </Row>

                                </ListGroup.Item>

                                <ListGroup.Item>

                                    <Row>

                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>

                                    </Row>

                                </ListGroup.Item>

                                {
                                    !order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? <Loader /> : (
                                                <PayPalButton 
                                                
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}

                                                />
                                            )}
                                        </ListGroup.Item>
                                    )
                                }

                                {loadingDeliver && <Loader />}
                                {
                                    userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

                                        <ListGroup.Item>

                                            <Button
                                                type="button"
                                                className="btn btn-block"
                                                onClick={deliverHandler}
                                            >


                                                Mark As Delivered
                                            </Button>

                                        </ListGroup.Item>

                                    )
                                }

                            </ListGroup>
                        </Card>

                    </Col>


                </Row>
            </>
            }
            
            
        </>
    )
}

export default OrderScreen
