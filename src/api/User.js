import request from '@/utils/request'
const querystring = require('querystring')


export const loginApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/user',
            method: 'post',
            data: querystring.stringify(params)
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        })
    })
}


export const getUserApi = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/user',
            method: 'get'
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(false)
        })
    })
}


export const updateUserApi = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/user',
            method: 'put',
            data: querystring.stringify(params)
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(false)
        })
    })
}