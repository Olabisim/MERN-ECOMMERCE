import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({location, history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    // the state.userLogin is from the reducer in the global state
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        // the history.push will never allow you inside the login page again
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH LOGIN
        dispatch(login(email, password))
    }

    return (
    
        <FormContainer >
            <h1>Sign In</h1>
            
            {error && <Message variant="danger">{error}</Message>}

            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    
                    <Form.Control
                    
                        type="email"
                        placeholdder="Enter email"
                        value={email}
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                    >
                        
                    </Form.Control>

                </Form.Group>


                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    
                    <Form.Control
                    
                        type="password"
                        placeholdder="Enter password"
                        value={password}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                    >
                        
                    </Form.Control>

                </Form.Group>


                <Button type="submit" variant='primary'>
                    Sign In
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    {/* we might have a redirect value */}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>

    );
};

export default LoginScreen;
