import axios from '../utils/axios.config.js'

export function getRoleInfoById(id){
    return axios.get('/home/getRoleInfo',{params: {roleId: id}})
}