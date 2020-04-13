import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, getEmail, setToken } from './auth';

const service = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? '' : '填写真正的后端地址',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://172.16.13.21:5100' /* 'http://localhost:5100' */ : 'http://127.0.0.1:5010',
    timeout: 15000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
})


service.interceptors.request.use(
    config => {
        const token = getToken()
        if (token != undefined && token != 'undefined') {
            config.headers.token = token
            config.headers.email = getEmail()
        }
        return config
    }
)

service.interceptors.response.use(
    res => {
        if (res.status == 200) {
            return Promise.resolve(res.data);
        } else {
            Message.error('错误的响应')
            console.error(res);
            return Promise.reject(res)
        }
    },
    error => {
        if (!error.response) {
            Message.error('网络错误')
            return;
        }
        if (error.response && error.response.status && error.response.status == 403) {
            setToken(undefined)
            window.location.reload();
            return
        }

        if (error.response.data.message) {
            Message.error(JSON.stringify(error.response.data))
        } else {
            Message.error(error.toString())
        }


        return Promise.reject(error)
    }
)

export default service