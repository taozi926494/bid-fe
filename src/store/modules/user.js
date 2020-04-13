import { BID_TYPE, BID_TYPE_CN, REGIONS } from '@/utils/const'
import { getUserApi } from '@/api/User'
const querystring = require('querystring')

export const genUserParams = user => {
    let params = {}
        // params.username = user.username
    params.email = user.email
    params.booking_circle = user.booking_circle
    params.booking_regions = user.booking_regions.join(',')
    let bookingCodes = []
    for (const bookType of user.booking_types) {
        bookingCodes.push(BID_TYPE_CN[bookType])
    }
    params.booking_types = bookingCodes.join(',')
    return params
}

export const user = {
    state: {
        username: '请登录',
        email: '',
        role: 0,

        booking_types: [],
        booking_regions: [],
        booking_circle: ''
    },
    mutations: {
        SET_BOOKING_TYPES(state, val) {
            state.booking_types = val.slice(0)
        },
        SET_BOOKING_CIRCLE(state, val) {
            state.booking_circle = val
        },
        SET_BOOKING_REGIONS(state, regions) {
            state.booking_regions = regions.slice(0)
        },
        SET_USER_NAME(state, val) {
            state.username = val
        },
        SET_EMAIL(state, val) {
            state.email = val
        },
        SET_ROLE(state, val) {
            state.role = val
        }
    },
    actions: {
        async getUser({ commit }) {
            const user = await getUserApi();
            if (user) {
                commit('SET_EMAIL', user.email)
                commit('SET_USER_NAME', user.name)
                commit('SET_ROLE', user.role)

                let bookingTypes = []
                for (const typeId of user.booking_types.split(',')) {
                    const bookingTypeCN = BID_TYPE[typeId]
                    if (bookingTypes.indexOf(bookingTypeCN) == -1) {
                        bookingTypes.push(bookingTypeCN)
                    }
                }
                commit('SET_BOOKING_TYPES', bookingTypes)
                commit('SET_BOOKING_CIRCLE', user.booking_circle)
                commit('SET_BOOKING_REGIONS', user.booking_regions.split(','))
            }
        },
        async updateUser({ commit }) {

        }
    }
}

export default user