import Mock from 'mockjs';
Mock.setup({
    timeout: '200-800'
})

const successRes = data => {
    return {
        status: 200,
        statusText: 'OK',
        data: data
    }
}
export { Mock, successRes }