import * as Types from './../actions/types'
const init = {
    user: {},
    isAuthenticated: false,
    errors: {}
}


const authReducer = (state=init,action) =>{
    switch(action.type){
        case Types.SET_USER: {
            return{
                ...state,
                user: action.payload.user,
                isAuthenticated: Object.keys(action.payload.user).length !== 0,
                
            }
            
        }
        case Types.USERS_ERROR: {
            return {
                ...state,
                errors: action.payload.error
            }
        }
        case Types.CREATE_USER: {
            return {
                createdUser: action.payload.createdUser
            }
        }
        case Types.ADD_TO_CART: {
            return {
                ...state, user:{
                    ...state.user,
                    cart: action.payload.cart_data
                }
                

            }
        }

        case Types.ON_SUCCESS_BUY_USER: {
            return {
                ...state, user:{
                    ...state.user,
                    cart: action.payload.cart,
                    history: action.payload.history
                }
                
            }
        }
        default: return state
    }
}

export default authReducer