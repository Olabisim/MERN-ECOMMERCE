import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAILURE,

    USER_LIST_REQUEST,
    USER_LIST_FAILURE,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_UPDATE_RESET
} from "../constants/userConstant";

export const userLoginReducer = (state = {}, action) => {

    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { loading: true };

        case USER_LOGIN_SUCCESS:
            // the same userinfo is used in localstorage 
            return { loading: false, userInfo: action.payload };

        case USER_LOGIN_FAILURE:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};

        default:
            return state;
    }

};



export const userRegisterReducer = (state={}, action) => {

    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
                // registerInfo: action.payload
                // instead creating a new registerInfo you are suppose to reuse the info 
                // because of the logic you wrote in the headers is with userInfo
                // you have to rewrite the same logic again with registerInfo
                // which is not making too much sense
            }
        case USER_REGISTER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state;

    }


}


// reducer accept two things state and action never forget
// he chose the user object because we chose user.save() 
// meaning the whole details about the user is stored in the user

// its userDetails we are looking for so we want user state from global state
export const userDetailsReducer = (state={ user: {}}, action) => {

    switch(action.type){

        case USER_DETAILS_REQUEST:
            return {...state, loading: true}

        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case USER_DETAILS_RESET:
            return { user: {}}
        default: 
            return state

    }


}




export const userUpdateProfileReducer = (state={ }, action) => {

    switch(action.type){

        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}

        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            }
        case USER_UPDATE_PROFILE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state

    }


}


export const userListReducer = (state={ users: [] }, action) => {

    switch(action.type){

        case USER_LIST_REQUEST:
            return {loading: true}

        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case USER_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LIST_RESET:
            return { users: [] };
            
        default: 
            return state

    }


}


export const userDeleteReducer = (state={ }, action) => {

    switch(action.type){

        case USER_DELETE_REQUEST:
            return {loading: true}

        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case USER_DELETE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state

    }

}


export const userUpdateReducer = ( state= { user: {} }, action ) => {

    switch(action.type){

        case USER_UPDATE_REQUEST:
            return {loading: true}

        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case USER_UPDATE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_RESET:
            return { user: {} };
            
        default: 
            return state

    }


}