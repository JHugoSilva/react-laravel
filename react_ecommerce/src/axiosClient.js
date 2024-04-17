import axios from 'axios'
import Cookies from 'js-cookie'

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
})

axiosClient.interceptors.request.use((config) => {
    const token = Cookies.get('ACCESS_TOKEN')
	config.headers = {
		"Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Authorization": `Bearer ${token}`
	}

    return config
}, error => {
    Promise.reject(error)
})

axiosClient.interceptors.response.use((response) => {
    return response
},(error) => {
    try {
        if (error.response.status === 401) {
            Cookies.remove('ACCESS_TOKEN')
            // window.location.href = '/site'   
        }
    } catch (error) {
        console.error(error);
    }
    throw error
})

export default axiosClient
