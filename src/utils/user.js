import Cookies from 'js-cookie';
export const getUser = () => {
    const userInfo = Cookies.get('userInfo');
    if (userInfo == undefined) {
        return false;
    }
    return JSON.parse(userInfo)
}

export const setUser = user => {
    console.log('i am in set user')
    Cookies.set('userInfo', JSON.stringify(user))
    console.log(Cookies.get('userInfo'))
}