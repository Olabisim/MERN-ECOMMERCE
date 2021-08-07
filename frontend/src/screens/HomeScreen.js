import React, { useEffect } from "react";
// import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// component
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
// data
// import products from '../products'

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    // [p, sp] = arr

    //because what we will be returning is an array
    // const [products, setProducts] = useState([])

    // only on load useeffect fires if no dependencies are passed
    // for example the useEffect below fires on load
    useEffect(() => {
        dispatch(listProducts());

        // const fetchProducts = async () => {

        // const { data } = res
        // const {data} = await axios.get('/api/products')
        // api format sent from the backend is an array that contains an object
        // setProducts(data)

        // }

        // fetchProducts()
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? 
            (
                <Loader />
            ) 
            : 
            error ? (
                <Message variant='danger'>{error}</Message>
            ) 
            : 
            (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
