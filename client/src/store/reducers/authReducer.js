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
                user: action.payload.user,
                isAuthenticated: Object.keys(action.payload.user).length !== 0,
                errors: {}
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
        default: return state
    }
}

export default authReducer