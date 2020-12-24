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
		component: () => import("@/views/login.vue")
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("@/views/Home.vue"),
		children:[{
			path:'index',
			name:'Index',
			component: () => import("@/views/index.vue")
		}]
	}
];

const router = new VueRouter({
	routes
});

export default router;
