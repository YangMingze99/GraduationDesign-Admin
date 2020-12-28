//用户api
//存放用户相关操作的api
import axios from '../utils/axios.config.js'
//只写请求方法
//请求接口
export function getUserInfo(token){
    return axios.get('/login/getUserInfo',{params:{token}})
}