import Cookies from 'js-cookie';
export const getToken = () => {
    return Cookies.get('token');
}

export const setToken = token => {
    Cookies.set('token', token)
}

export const getEmail = () => {
    return Cookies.get('email');
}

export const setEmail = email => {
    Cookies.set('email', email)
}

export const getPassword = () => {
    return Cookies.get('password');
}

export const setPassword = password => {
    Cookies.set('password', password)
}