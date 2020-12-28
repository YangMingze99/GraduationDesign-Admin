<template>
	<div class="header">
		<div class="headerTitle">
			<h2 style="color: white">{{ headertitle }}</h2>
		</div>
		<div class="headerRight">
			<el-avatar class="avatar" :size="35" :src="squareUrl"> </el-avatar>
			<el-tag effect="dark" style="margin-left: -33px">当前用户：{{ username }}
			</el-tag>
			<el-button type="danger" class="logoutBtn" style="padding: 10px" icon="el-icon-switch-button" round @click="logout">注销</el-button>
		</div>
	</div>
</template>

<script>
	import eventBus from "../utils/eventBus.js";
	export default {
		name: "adminHeader",
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
			this.username = eventBus.$data.userInfo.data[0].username;
			this.imgUrl = eventBus.$data.userInfo.data[0].avatar;
			//eventBus.$data.userInfo.data[0].last_modelfied_time 转换当前时区日期
			this.time = new Date(
				eventBus.$data.userInfo.data[0].last_modelfied_time
			).toLocaleString();
			// console.log(this.imgUrl);
		},
		methods: {
			logout() {
				this.$axios({
					url: "/login/logout",
					method: "post",
				}).then((result) => {
					this.$router.push({
						name: "loginview",
						path: "/login",
					});
				});
			},
		},
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
