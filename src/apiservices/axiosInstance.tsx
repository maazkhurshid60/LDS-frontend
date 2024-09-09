import axios from 'axios';
import { toast } from 'react-toastify';
import { logoutUser } from '../redux/slice/userDetail';
import { useDispatch } from 'react-redux';

// Create an Axios instance
const api = axios.create({
    baseURL: "https://lds-backend-server.onrender.com/api/v1",
});


// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // If unauthorized or token expired
        if (error.response?.status === 401) {
            toast.error('Session expired. Please login again.');
            // Remove access token
            localStorage.removeItem('accessToken');

            // Show error toast message

            // Redirect to login page
            window.location.href = '/login'; // Or use React Router's `navigate`
        }
        return Promise.reject(error);
    }
);

export default api;
