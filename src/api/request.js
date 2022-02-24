
// 这个js文件主要用于创建axios实例对象，并设置拦截器

import axios from 'axios';
// import showMessage from '../utils/showMessage';

const instance = axios.create();  // 创建一个axios实例

// 响应拦截器
instance.interceptors.response.use(resp => {
    // if (resp.data.code !== 0) {   // resp.data.code === 0，表示没有错误
    //     showMessage({
    //         content: resp.data.msg,
    //         type: 'error',
    //         duration: 1500,
    //     });
    //     return null;
    // }
    return resp.data;
});

export default instance;