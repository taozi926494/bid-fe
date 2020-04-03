import request from '../utils/request.js'


export function getInfoApi(params) {
    return new Promise((resolve, reject) => {
        request({
            url: '/info',
            method: 'get',
            params: params
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        })
    })
}