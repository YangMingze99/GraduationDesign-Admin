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
		children: [{
			path: 'index',
			name: 'Index',
			component: () => import("@/views/index.vue")
		}]
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
