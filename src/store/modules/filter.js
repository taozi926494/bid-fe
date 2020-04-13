import { BID_TYPE, BID_TYPE_CN, REGIONS } from '@/utils/const'

export const genFilterParams = filter => {
    let param = {}
    param.page = filter.page;
    param.page_size = filter.page_size;

    if (filter.bid_type !== '') {
        param.bid_type = BID_TYPE_CN[filter.bid_type].join(',');
    }
    if (filter.it_level !== '') {
        param.grade = filter.it_level;
    }
    if (filter.regions.length < REGIONS.length) {
        param.region = filter.regions.join(',');
    }
    return param;
}

export const filter = {
    state: {
        page: 1,
        page_size: 10,
        total: 0,

        bid_type: '',
        it_level: '',
        regions: REGIONS.slice(0)
    },
    mutations: {
        SET_BID_TYPE(state, val) {
            state.bid_type = val
        },
        SET_IT_LEVEL(state, val) {
            state.it_level = val
        },
        SET_REGIONS(state, regions) {
            state.regions = regions.slice(0)
        },
        SET_PAGE(state, val) {
            state.page = val
        },
        SET_TOTAL(state, val) {
            state.total = val
        }
    },
    actions: {
        // async listData(store) {
        //     const param = genParams(store.state);
        //     console.log('--- param  ', param)
        //     return new Promise((resolve, reject) => {
        //         request({
        //             url: '/dataset',
        //             method: 'post',
        //             data: querystring.stringify(param)
        //         }).then((res) => {
        //             console.log('---  res', res)
        //             resolve(res)
        //         }).catch((e) => {
        //             reject(e)
        //         })
        //     })
        // }
    }
}