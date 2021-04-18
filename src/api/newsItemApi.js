import axios from '../utils/axios.config.js'
const newsItem = {
    getNewsItemByChildId(currentChildId){
        return axios.get('/newsItem/getNewsItem',{
            params:{
                childId:currentChildId
            }
        })
    },
    getNewsItemByParentId(currentParentId){
        return axios.get('/newsItem/getNewsItemByParentId',{
            params:{
                parentId:currentParentId
            }
        })
    },
    getNewsDetailByNewsId(newsId){
        return axios.get('/newsItem/getNewsDetail',{
            params:{
                newsId:newsId
            }
        })
    },
    getSwiperNewsItem(){
        return axios.get('/newsItem/getSwiperBannerNews')
    }
}

export default newsItem;