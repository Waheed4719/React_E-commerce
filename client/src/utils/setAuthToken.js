import Axios from 'axios'

const setAuthToken = token => {
    if(token){
        console.log('here also')
        Axios.defaults.headers.common['Authorization'] = token
        console.log( Axios.defaults.headers.common['Authorization'])
    }
    else{
        Axios.defaults.headers.common['Authorization'] = ''
    }
}
export default setAuthToken