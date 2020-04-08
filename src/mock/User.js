import { Mock, successRes } from './preSet';

export const login = Mock.mock('/user', 'post', info => {
    console.log('loginApi', info);
    return {
        email: '371956576@qq.com',
        name: '谢红韬',
        booking_time: '2020-03-30 14:00',
        book_circle: '24',
        role: "1"
    }
})

export const subscription = Mock.mock('/user', 'put', info => {
    console.log('loginApi', info);
    return {
        email: '371956576@qq.com',
        name: '谢红韬',
        booking_time: '2020-03-30 14:00',
        book_circle: '24',
        role: "1"
    }
})