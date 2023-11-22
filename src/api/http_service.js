import axios from 'axios'
/**
 * 封装axios的方法
 */
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    console.log(url);
    axios.get(url, {
      params: params,
      headers:{
        token:localStorage.getItem('token'),
      },
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
/**
 * 同步get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export async function getwait(url, params){
  return await axios.get(url, { params: params })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, {
      params: params,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err =>{
        reject(err.data)
      })
  })
}

