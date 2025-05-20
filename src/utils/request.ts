// import axios, { AxiosRequestConfig } from 'axios'

// export function request(config: AxiosRequestConfig<any>) {
//     const request = axios.create({
//         baseURL: 'http://localhost:8888', // 后端请求端口设置，根据自己的端口进行设置
//         timeout: 4000 // 超时时间
//     })

//     // request 请求拦截
//     // 可以在请求发送前对请求做一些处理
//     // eg.统一加上token，对请求参数统一加密
//     request.interceptors.request.use(config => {
//         config.headers['Content-Type'] = 'application/json;charset=utf-8';
//         // console.log(config);
//         // config.headers['token'] = user.token;  // 设置请求头
//         return config
//     }, error => {
//         console.log(error);
//     });

//     // response 响应拦截
//     // 可以在接口响应后统一处理结果
//     request.interceptors.response.use(
//         response => {
//             let res = response.data;
//             // console.log(res);
//             // 如果是返回的文件
//             if (response.config.responseType === 'blob') {
//                 return res
//             }
//             // 兼容服务端返回的字符串数据
//             if (typeof res === 'string') {
//                 // 如果是json字符串，将json字符串转换为json对象
//                 res = res ? JSON.parse(res) : res
//             }
//             return res;
//         },
//         error => {
//             console.log('err' + error) // 控制台打印错误信息，用于调试

//         })
//     // 直接返回
//     return request(config)
// }

// // export default request




// import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8888'
// axios.defaults.headers.common.Authorization = 'qxc'

// axios.interceptors.request.use(config => {
//   // 在发送请求之前做些什么
//   return config
// }, error => {
//   // 处理请求错误
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(response => {
//   // 对响应数据做些什么
//   return response
// }, error => {
//   // 处理响应错误
//   return Promise.reject(error)
// })

// export default axios



import axios from 'axios'

// 创建一个axios对象出来
const request = axios.create({
     baseURL: 'http://localhost:8888',
    //baseURL: 'https://f1ad-58-194-169-164.ngrok-free.app',

    
    timeout: 1000000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    //config.headers['User-Agent'] = 'CustomUserAgent/1.0';
    config.headers['ngrok-skip-browser-warning'] = 'true';
   //config.headers['Content-Type'] = 'application/json;charset=utf-8';
   config.headers['Content-Type'] =  'multipart/form-data'
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
// request.interceptors.response.use(
//     response => {
//         // response.data即为后端返回的Result
//         let res = response.data;
//         // 兼容服务端返回的字符串数据
//         if (typeof res === 'string') {
//             res = res ? JSON.parse(res) : res
//         }
//         return res;
//     },
//     error => {
//         console.log('err' + error) // for debug
//         return Promise.reject(error)
//     }
// )


export default request