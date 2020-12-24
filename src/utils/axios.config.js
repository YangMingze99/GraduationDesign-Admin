import axios from "axios";
//引入element-ui弹窗组件 
import {Message} from 'element-ui'
import router from '../router'

//设置接口默认地址
axios.defaults.baseURL = "http://localhost:3000";
//拦截器  判定token是否过期
axios.interceptors.request.use(
	function(config) {
		// console.log(config);
		//获取存储的token
		const token = window.localStorage.getItem('user-token');
		//token 放在专有的头信息中 Authorization
		config.headers.Authorization = `Bearer ${token}`;
		//必须有return 
		//cors 跨域 处理复杂请求  会发送两次一次用来确认服务器是否允许请求 一次传输
		return config
	},
	function() {

	})
//拦截响应
axios.interceptors.response.use(
	//拦截相应没有反应到home
	function(succresponse) {
		// console.log(succresponse.data, 'axios-response');
		//console.log(succresponse.status);
		// console.log(succresponse.data);
		let message = ''
		const succresponseStatus = Number(succresponse.data.data);
		// console.log(succresponseStatus);
		switch (succresponseStatus) {
			case 201:
				message = "登陆成功！";
				break;
			case 202:
				message = "注销成功！";
				break;
		}
		if (succresponseStatus != 200 && !Object.is(succresponseStatus, NaN)) {
			Message({
				type: 'success',
				message: message
			})
		}

		return succresponse.data ? succresponse.data : {};
	},
	function(error) {
		// console.log(error,'axios-error');
		//获取http状态码
		const status = error.response.status ? error.response.status : 401;
		let message = '';
		switch (status) {
			case 401:
				message = '授权已过期，请重新登陆  1s后会跳转至登陆页面';
				//清除token
				window.localStorage.removeItem('user-token');
				setTimeout(() => {
					router.push({
						path: '/'
					});
				}, 1500)
				break;
			case 402:
				message = '登陆发生错误，请重新登陆';
				setTimeout(() => {
					router.go(0);
				}, 1500)
				break;
			default:
				message = error.response.data.message;
				break;
		}
		//弹窗警告
		Message({
			type: 'warning',
			message: message
		})
		//返回空promise对象
		return new Promise(() => {});
	}
)
export default axios;
