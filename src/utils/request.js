import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? '' : '填写真正的后端地址',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://172.16.13.21:5100' : '填写真正的后端地址',
    timeout: 15000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
})

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
        console.error(error);
        if (error.response.data.message) {
            Message.error(error.response.data.message)
        } else {
            Message.error(error.toString())
        }

        return Promise.reject(error)
    }
)

export default service