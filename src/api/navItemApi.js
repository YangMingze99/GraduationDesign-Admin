import axios from '../utils/axios.config.js'
const navItem ={
    getNavItemByParentId(currentParentId){
        return axios.get('/navItem/getChildItem',{
            params:{
                parentId:currentParentId
            }
        })
    },
}

export default navItem