import {combineReducers} from 'redux'
import auth from './authReducer'
import admin from './adminReducer'


 const rootReducer = combineReducers({
     auth,
     admin,
  
})

export default rootReducer






