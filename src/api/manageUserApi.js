import axios from '../utils/axios.config.js'

const manageUser = {
    // 新添用户
    addNewUser(formData) {
        return axios.post('/home/adduser', {
                data: formData
            })
    },
    getAllUser(){
        return axios.get('/home/getAllUsers')
    },
    deleteUserById(id){
        return axios.post('/home/deleteUser', {
            id: id
        })
    }

}
export default manageUser