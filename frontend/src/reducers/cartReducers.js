import { CART_ADD_ITEM, 
         CART_REMOVE_ITEM, 
         CART_SAVE_SHIPPING_ADDRESS,
         CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'



const cartReducers = (state = { cartItems: [], shippingAddress: {} }, action) => {

    // console.log('-----------------------------')
    // console.log(state.cartItems
    //     .filter(x => x.product !== action.payload))

        switch(action.type) {
            case CART_ADD_ITEM: 
                const item = action.payload;

                // to check if it exist
                const existItem = state.cartItems.find(
                    x => x.product === item.product
                )

                if(existItem) {

                    // if item exist loop through everything the way they are

                    return {
                        ...state,
                        cartItems: state.cartItems.map(
                            x => x.product === existItem.product
                            ? 
                            item
                            : 
                            x
                        )
                    }

                } 
                else {
                    return {

                        // if item doesn't exist then add the item i.e push to array
                    
                        ...state,
                        cartItems: [...state.cartItems, item]
                    }
                }
 
            case CART_REMOVE_ITEM: 
                return {
                    // we want to filter out the we are removing

                    ...state,
                    cartItems: state.cartItems
                        .filter(x => x.product !== action.payload)
                    
                    
                }
                

            case CART_SAVE_SHIPPING_ADDRESS: 
            return {

                ...state,
                shippingAddress: action.payload,
                
            }

            case CART_SAVE_PAYMENT_METHOD: 
            return {

                ...state,
                paymentMethod: action.payload,
                
            }

            default: 
                return state;

        }
}


export default cartReducers
