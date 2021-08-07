import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

// getState passed is used to get all the state passed in in combine
// reducers inside store you will get hold of all the cart state specifically

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
            // i hope you still remembered qty equals qty
        },
    });

    //json.stringify because we can only save strings in local storage
    // THEN TO RECIEVE THE DATA BACK YOU WILL USE JSON.PARSE
    //JSON.STRINGIFY CONVERT OBJECTS TO STRINGS
    //JSON.PARSE CONVERT THE STRINGS BACK TO OBEJECT

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
  
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
};
