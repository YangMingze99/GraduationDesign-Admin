<template>
	<div>
		<el-container>
			<el-header height="60px" class='header'>
				<adminHeader ></adminHeader>
			</el-header>
			<el-container>
				<el-aside width="220px" class='side'>
					<sidebar></sidebar>
				</el-aside>
				<el-main style="background-color:#eee">
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
		<el-backtop></el-backtop>
	</div>
</template>

<script>
	import adminHeader from '@/components/header.vue'
	import sidebar from '@/components/siderbar.vue'
	export default {
		name: "Home",
		inject:['reload'],
		data(){
			return {
				username:''
			}
		},
		components: {
			sidebar,
			adminHeader
		}
	};
</script>

<style lang="less" scoped="scoped">
	.header {
		background-color: #9966ff;
	}

	.side {
		border-right: 1px solid #ccc;
		// min-height: 80vh;
		height: 100vh;

	}
</style>
