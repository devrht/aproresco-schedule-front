import axios from 'axios';
// import {getAuthToken} from "Helpers/tokens";

const addToken = () => {
    axios.interceptors.request.use(
        async (config) => {
            try {
                // Get auth token
                const accessToken = JSON.parse(localStorage.getItem("token"));
                
                if (accessToken) {
                    config.headers['Authorization'] = 'Bearer ' + accessToken;
                }

                // config.headers['Content-Type'] = 'application/json';
                return config;
            } catch (e) {
                console.log('ERROR => ', e)
                return config;
            }

        },
        error => Promise.reject(error));
}


export default addToken;
