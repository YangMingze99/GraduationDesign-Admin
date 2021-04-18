import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
const routes = [{
		path: "/",
		redirect: "/login"
	},
	{
		path: "/login",
		name: "loginview",
		meta: {title : "登录"},
		component: () => import("@/views/login.vue")
	},
	{
		path: "/home",
		name: "Home",
		meta: {title : "主页"},
		component: () => import("@/views/Home.vue"),
		redirect:"/home/index",
		children: [
			{
				path: 'index',
				name: '首页',
				component: () => import("@/components/index.vue")
			},
			{
				path: 'addUser',
				name: '新建用户',
				component: () => import("@/components/addUser.vue")
			},
			{
				path: 'editUser',
				name: '管理用户',
				component: () => import("@/components/manageUser.vue")
			},
			{
				path: 'editPassword',
				name: '修改登录密码',
				component: () => import("@/components/editPassword.vue")
			},
			{
				path: 'userPermissions',
				name: '用户权限配置',
				component: () => import("@/components/userPermissions.vue")
			},
			{
				path: 'manageNews/:id',
				name: 'manageNews',
				component: () => import("@/components/manageNews.vue")
			}
	]
	}
];

const router = new VueRouter({
	routes
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router;
