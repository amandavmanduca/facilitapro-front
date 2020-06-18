import axios from 'axios';

const api = axios.create({
    
    baseURL: 'https://facilitapro-api.herokuapp.com',
})

export default api;