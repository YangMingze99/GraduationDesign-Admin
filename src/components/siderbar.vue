<template>
	<div class="sidebar">
		<el-menu router :default-active="this.$router.path"  class="el-menu-vertical-siderbar" >
			<el-submenu index="/home">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>仪表盘</span>
				</template>
				<el-menu-item-group>
					<!-- <template slot="title">分组一</template> -->
					<el-menu-item exact index="/home/index">首页</el-menu-item>
					<el-menu-item  exact index="/home">选项2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="分组2">
					<el-menu-item index="1-3">选项3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<template slot="title">选项4</template>
					<el-menu-item index="1-4-1">选项1</el-menu-item>
				</el-submenu>
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
