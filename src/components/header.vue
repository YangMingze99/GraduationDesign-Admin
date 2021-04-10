<template>
	<div class="header">
		<div class="headerTitle">
			<h2 style="color: white">{{ headertitle }}</h2>
		</div>
		<div class="headerRight">
			<el-avatar class="avatar" :size="35" :src="imgUrl"> </el-avatar>
			<el-tag effect="dark" style="margin-left: -33px">当前用户：{{ username }}
			</el-tag>
			<el-button type="danger" class="logoutBtn" style="padding: 10px" icon="el-icon-switch-button" round @click="logout">注销</el-button>
		</div>
	</div>
</template>

<script>
	import eventBus from "../utils/eventBus.js";
	import axios from '../utils/axios.config'
	export default {
		name: "adminHeader",
		inject:['reload'],
		data() {
			return {
				headertitle: "计算机学院网站后台管理系统",
				squareUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
				username: "",
				imgUrl: "",
				time: "",
			};
		},
		created() {
			this.setData()
		},
		methods: {
			setData(){
				this.username = eventBus.$data.userInfo.data[0].username;
				this.imgUrl = axios.defaults.baseURL+eventBus.$data.userInfo.data[0].avatar;
				this.time = new Date(eventBus.$data.userInfo.data[0].last_modelfied_time).toLocaleString();
			},
			logout() {
				this.$axios({
					url: "/login/logout",
					method: "post",
				}).then((result) => {
					this.$router.push({
						name: "loginview",
						path: "/login",
					});
					this.$router.go(0)
				});
			},
		}
	};
</script>

<style lang="less" scoped="scoped">
	.header {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.headerRight {
			display: flex;
			width: 300px;
			justify-content: space-around;
			align-items: center;
		}
	}
</style>
