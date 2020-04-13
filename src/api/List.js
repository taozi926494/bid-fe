import request from '../utils/request.js'
const querystring = require('querystring')

export function listDataApi(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/dataset',
            method: 'post',
            data: querystring.stringify(data)
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        })
    })
}

export function editeLabelApi(params) {
    return new Promise((resolve, reject) => {
        request({
            url: '/label',
            method: 'post',
            data: querystring.stringify(params)
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        })
    })
}