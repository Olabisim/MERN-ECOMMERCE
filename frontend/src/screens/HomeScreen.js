import React, { useEffect } from "react";
// import axios from 'axios'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// component
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
// data
// import products from '../products'

const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    // [p, sp] = arr

    //because what we will be returning is an array
    // const [products, setProducts] = useState([])

    // only on load useeffect fires if no dependencies are passed
    // for example the useEffect below fires on load
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));

        // const fetchProducts = async () => {

        // const { data } = res
        // const {data} = await axios.get('/api/products')
        // api format sent from the backend is an array that contains an object
        // setProducts(data)

        // }
 
        // fetchProducts()
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />

            {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light"> Go Back </Link>}

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
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : "" } />
                </>
            )}
        </>
    );
};

export default HomeScreen;
