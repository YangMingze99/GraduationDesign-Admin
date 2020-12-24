<template>
	<div>
		<el-container>
			<el-header height="60px" class='header'>
				<adminHeader :username="username"></adminHeader>
			</el-header>
			<el-container>
				<el-aside width="220px" class='side'>
					<sidebar></sidebar>
				</el-aside>
				<el-main>
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
		data(){
			return {
				username:''
			}
		},
		components: {
			sidebar,
			adminHeader
		},
		created() {
			this.$axios({
				url:'/home/getname',
				method:'get'
			}).then((result)=>{
				if(result){
					this.username = result.data.username ;
				}
			}).catch((error)=>{
				
			})
		}
	};
</script>

<style lang="less" scoped="scoped">
	.header {
		background-color: #9966ff;
	}

	.side {
		border-right: 1px solid #ccc;
		min-height: 80vh;
		height: 700vh;

	}
</style>
