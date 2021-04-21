<template>
	<div class="sidebar">
		<el-menu router :default-active="this.$route.path"  class="el-menu-vertical-siderbar" >
			<el-menu-item index="/home/index">
				<i class="el-icon-menu"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index='/users'>
				<template slot="title">
					<i class="el-icon-user-solid"></i>
					<span>用户管理</span>
				</template>
				<el-menu-item-group>
					<!-- <template slot="title">分组一</template> -->
					<el-menu-item  exact index="/home/addUser">新增用户</el-menu-item>
					<el-menu-item  exact index="/home/editUser">管理用户信息</el-menu-item>
					<el-menu-item  exact index="/home/editPassword">修改密码</el-menu-item>
					<el-menu-item v-if="username === 'admin'" exact index="/home/userPermissions">角色权限</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index='/news'>
				<template slot="title">
					<i class="el-icon-menu"></i>
					<span>新闻管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item exact v-if="username === 'admin'" index="/home/commitNews" >新闻审核</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group v-for="item in userRole" :key="item">
					<el-menu-item exact v-if="item == '1'" index="/home/manageNews/1" >学院概况栏目</el-menu-item>
					<el-menu-item exact v-if="item == '2'" index="/home/manageNews/2" >师资队伍栏目</el-menu-item>
					<el-menu-item exact v-if="item == '3'" index="/home/manageNews/3" >教学工作栏目</el-menu-item>
					<el-menu-item exact v-if="item == '4'" index="/home/manageNews/4" >科研工作栏目</el-menu-item>
					<el-menu-item exact v-if="item == '5'" index="/home/manageNews/5" >实验教学栏目</el-menu-item>
					<el-menu-item exact v-if="item == '6'" index="/home/manageNews/6" >党建工作栏目</el-menu-item>
					<el-menu-item exact v-if="item == '7'" index="/home/manageNews/7" >学团工作栏目</el-menu-item>
					<el-menu-item exact v-if="item == '8'" index="/home/manageNews/8" >招生就业栏目</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	import eventBus from "../utils/eventBus.js";
	export default {
		name: 'siderbar',
		data() {
			return {
				username: "",
				userRole:[]
			}
		},
		methods: {
			setData(){
				this.username = eventBus.$data.userInfo.data[0].username;
				this.userRole = eventBus.$data.userInfo.data[0].role.split(',');
				// console.log(this.userRole);
			}
		},
		created() {
			this.setData()
		},
	}
</script>

<style scoped="scoped">
	.el-menu{
		border-right: 0px;
	}
	/* .el-menu-vertical-siderbar {
		
	} */
	.el-menu-item.is-active {
	        background-color: rgb(231, 235, 240) !important;
	}
</style>
