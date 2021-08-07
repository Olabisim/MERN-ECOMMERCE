import axios from "axios";
import {
    USER_DETAILS_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,

    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,

    USER_REGISTER_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAILURE,

    USER_LIST_FAILURE,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,
    
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
} from "../constants/userConstant";
import { MY_ORDER_LIST_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        // setting custom headers
        // content-type to application/json

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // because axios will return res.data
        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem(
            // userInfo is used in userlogin failure in action.type
            "userInfo",
            JSON.stringify(data)
        );
        // localStorage.removeItem(
            // userInfo is used in userlogin failure in action.type
        //     "userRegister",
        // );
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            // payload is whateve the message is from the server
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo', 'userRegister')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: MY_ORDER_LIST_RESET})
    dispatch({type: USER_LIST_RESET})

}


export const register = (name, email, password) => async (dispatch) => {
    try {
        // const removeUserRegisterFromStorage = localStorage.removeItem("registerInfo")
        // ? JSON.parse(localStorage.getItem("registerInfo"))
        // : null;

        // removeUserRegisterFromStorage()

        dispatch({type: USER_REGISTER_REQUEST})


        const config = {
            headers: {
                "Content-Type":"application/json"

            }
        }

        const {data} = await axios.post('/api/users', {name, email, password}, config)



        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        // log the user in immediately if it succeeds
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
        

        
    }
    catch(error) {
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload:  error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}











// we can always get our userInfo from getState
// we will pass the id as profile from the profile screen
export const getUserDetails = (id) => async (dispatch, getState) => {

    try {

        dispatch({type: USER_DETAILS_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }


        const {data} = await axios.get(
            `/api/users/${id}`,
            config

        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    }
    catch(error){

        dispatch({
            type: USER_DETAILS_FAILURE,
            payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }


}




// passing getState because of set token
export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {

        dispatch({type: USER_UPDATE_PROFILE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.put(
            `/api/users/profile`,
            user,
            config

        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })


    }
    catch(error){

        dispatch({
            type: USER_UPDATE_PROFILE_FAILURE,
            payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }


}



export const listUsersAction = () => async (dispatch, getState) => {

    try {

        dispatch({type: USER_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get(
            `/api/users`,
            config

        )

        dispatch({
            type: USER_LIST_SUCCESS,
            // the data should be all the users
            payload: data
        })


    }
    catch(error){

        dispatch({
            type: USER_LIST_FAILURE,
            payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }


}


export const deleteUserAction = (id) => async (dispatch, getState) => {

    try {

        dispatch({type: USER_DELETE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(
            `/api/users/${id}`,
            config

        )

        dispatch({
            type: USER_DELETE_SUCCESS,
        })


    }
    catch(error){

        dispatch({
            type: USER_DELETE_FAILURE,
            payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }


}



export const updateUserAction = (user) => async (dispatch, getState) => {

    try {

        dispatch({type: USER_UPDATE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.put(
            `/api/users/${user._id}`,
            user,
            config

        )

        dispatch({
            type: USER_UPDATE_SUCCESS
        })

        // WE ARE PASSING ANOTHER DISPATCH CALLED USER DETAILS SUCCESS
        // WE WANT THE USER DETAILS THAT WAS THERE BEFORE TO UPDATE
        // TO CURRENT ONE 

        // passing the updated user into user details
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    }
    catch(error){

        dispatch({
            type: USER_UPDATE_FAILURE,
            payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }


}

