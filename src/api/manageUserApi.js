import axios from '../utils/axios.config.js'

const manageUser = {
    // 新添用户
    addNewUser(formData) {
        return axios.post('/home/adduser', {
                    data: formData
            })
    },
    
}
export default manageUser