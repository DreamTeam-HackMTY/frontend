import {user} from '../services/session.js'
export async function VerifySession(to, from, next){
    const token = localStorage.getItem('token');
    if(!token) return next('/login');
    try {
        const res = await user();
        const data = res.data;
        localStorage.setItem('user', JSON.stringify(data));
        return next();
    } catch (error) {
        console.error(error)
        localStorage.clear();
        return next('/login');
    }
}

export async function VerifyLogin(to, from, next){
    const token = localStorage.getItem('token');
    if(token) return next();
    try {
        const res = await user();
        const data = res.data;
        localStorage.setItem('user', JSON.stringify(data));
        return next('/');
    } catch (error) {
        console.error(error)
        localStorage.clear();
        return next();
    }
}