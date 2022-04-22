import axios from "axios";

//test commit
const instance = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://emt-library-web.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
})

export default instance;