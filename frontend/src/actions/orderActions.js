// import React from 'react'
import axios from 'axios';
import {
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,

    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,

    ORDER_PAY_REQUEST,
    ORDER_PAY_FAILURE,
    ORDER_PAY_SUCCESS,
    
    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAILURE,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,

} from "../constants/orderConstants";

// action always dispatch

export const createOrderAction = (order) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })

    }
    catch (error) {
        dispatch({

            type: ORDER_CREATE_FAILURE,
            payload:  
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })
    }

}


export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                // GET REQUEST DO NOT NEED CONTENT TYPE
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })

    }
    catch (error) {
        dispatch({

            type: ORDER_DETAILS_FAILURE,
            payload:  
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })
    }

}

// paymentResult coming from paypal
export const payOrderAction = (orderId, paymentResult) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })

    }
    catch (error) {
        dispatch({

            type: ORDER_PAY_FAILURE,
            payload:  
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })
    }

}


// we don't have to pass anything because it knows the user by its tokens
export const myOrderListAction = () => async (dispatch, getState) => {
    
    // MY_ORDER_LIST_REQUEST,
    // MY_ORDER_LIST_SUCCESS,
    // MY_ORDER_LIST_FAILURE
    try {
        dispatch({
            type: MY_ORDER_LIST_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: MY_ORDER_LIST_SUCCESS,
            payload: data,
        })

    }
    catch (error) {
        dispatch({

            type: MY_ORDER_LIST_FAILURE,
            payload:  
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })
    }

}


export const listOrdersAction = () => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.get(`/api/orders`, config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        })

    }
    catch (error) {
        dispatch({

            type: ORDER_LIST_FAILURE,
            payload:  
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })
    }

}