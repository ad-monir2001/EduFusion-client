import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useEffect } from 'react';
const axiosSecure  = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOut} = useAuth()
    useEffect(()=> {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log(error.response);
                if(error.response.status === 401 || error.response.status === 403){
                    logOut()
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    },[logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;