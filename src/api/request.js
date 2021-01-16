import axios from 'axios'
import router from '../router';
const http = axios.create({
    baseURL:'http://127.0.0.1:3000',
    // timeout:3000
})
http.interceptors.request.use(config=>{
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
http.interceptors.response.use(res=>{
    if (res.data.code==1) {
        router.push('/login')
        localStorage.clear()
        window.location.reload()
    }
    return res;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default http