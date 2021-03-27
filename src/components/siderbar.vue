<template>
	<div class="sidebar">
		<el-menu router :default-active="this.$router.path"  class="el-menu-vertical-siderbar" >
			<el-menu-item index="/home/index">
				<i class="el-icon-menu"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="/userManagement">
				<template slot="title">
					<i class="el-icon-user-solid"></i>
					<span>用户管理</span>
				</template>
				<el-menu-item-group>
					<!-- <template slot="title">分组一</template> -->
					<el-menu-item exact index="/home/addUser">新增用户</el-menu-item>
					<el-menu-item  exact index="/home/editUser">管理用户信息</el-menu-item>
					<el-menu-item  exact index="/home/userPermissions">角色权限</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item>
			<el-menu-item index="3">
				<i class="el-icon-document"></i>
				<span slot="title">导航三</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'siderbar',
		methods: {
			
		}
	}
</script>

<style scoped="scoped">
	.el-menu{
		border-right: 0px;
	}
	.el-menu-vertical-siderbar {
		
	}
	.el-menu-item.is-active {
	        background-color: rgb(231, 235, 240) !important;
	}
</style>
