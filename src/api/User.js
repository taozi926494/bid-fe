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