import * as Types from './../actions/types'
const init = {
    admin: {},
    isAdmin: false,
    errors: {}
}


const adminReducer = (state=init,action) =>{
    switch(action.type){
        case Types.SET_ADMIN: {
            return{
                admin: action.payload.admin,
                isAdmin: Object.keys(action.payload.admin).length !== 0,
                errors: {}
            }
            
        }
        case Types.ADMINS_ERROR: {
            return {
                ...state,
                errors: action.payload.error
            }
        }
        default: return state
    }
}

export default adminReducer