/* 两钩子函数  进入路由之前 进入路由之后*/
import router from './index.js'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import eventBus from '../utils/eventBus.js'
import {getUserInfo} from '../api/getUserInfo.js';
import {Message} from 'element-ui'
import getPageTitle from '../utils/getPageTitle.js'

//进入路由之前
const whiteList = ['/login']   //白名单 没有token也能访问的内容
router.beforeEach(async(to,from,next)=>{
    // console.log(to);
    // console.log(from);
    // document.title = to.meta.title;
    document.title = getPageTitle(to.meta.title)
    Nprogress.start();
    const token = window.localStorage.getItem('user-token');
    if(token){
        if(to.path === '/login'){
            next({path:'/home'})
            Nprogress.done();
        }else{
            //获取当前用户信息
            const hasGetUserInfo = eventBus.$data.userInfo;
            //根据有没有个人信息处理
            if(hasGetUserInfo){
                //存在个人信息继续执行
                next();
            }else{
                //不存在 向后台获取用户信息 获取中可能存在错误 使用try-catch
                try {
                    const token = window.localStorage.getItem('user-token');
                    eventBus.$data.userInfo = await getUserInfo(token);
                    console.log(eventBus.$data.userInfo);
                    next()
                } catch (error) {
                    window.localStorage.removeItem('user-token')
                    //发生错误 回去重新登陆
                    Message({
                        type:'error',
                        message:error || '这里有点情况'
                    })
                    next(`/login?=redirect=${to.path}`);
                    Nprogress.done();
                }
            }
        }
    }else{
        //没有token
        // if(whiteList.indexOf(to.path) != -1){
        if(whiteList.includes(to.path)){
            //在白名单内 放行
            next();
        }else{
            //其他没有token的拦截 重定向到login
            next(`/login?=redirect=${to.path}`);
            Nprogress.done();
        }
    }

    next();
})
//进入路由之后
router.afterEach((to,from,next)=>{
    Nprogress.done();
})

export default router