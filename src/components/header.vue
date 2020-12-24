<template>
	<div class="header">
		<div class="headerTitle">
			<h2>{{headertitle}}</h2>
		</div>
		<div class="headerRight">
			<el-avatar class="avatar" :size="35" :src="squareUrl"> </el-avatar>
			<el-tag effect="dark" style="margin-left: -33px;">当前用户：{{username}} </el-tag>
			<el-button type="danger" class="logoutBtn" style="padding:10px" icon="el-icon-switch-button" round @click="logout">注销</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name:'adminHeader',
		data(){
			return {
				headertitle:'计算机学院网站后台管理系统',
				squareUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
			}
		},
		props:{
		    username:String,
		    default:''
		},
		methods:{
			logout(){
				this.$axios({
					url:'/login/logout',
					method:'post'
				}).then((result)=>{
					
				})
				window.localStorage.removeItem('user-token');
				this.$router.push({
					name: "loginview",
					path: "/login"
				})
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.header{
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.headerRight{
			display: flex;
			width: 300px;
			justify-content:space-around;
			align-items: center;
		}
	}
</style>
