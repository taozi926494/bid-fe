const getters = {
    page: state => state.filter.page,
    it_level: state => state.filter.it_level,
    regions: state => state.filter.regions,
    bid_type: state => state.filter.bid_type,

    username: state => state.user.username
}

export default getters;