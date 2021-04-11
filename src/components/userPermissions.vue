<template>
	<div>
		<span>用户权限分配</span>
		<el-divider></el-divider>
		
	</div>
</template>
<style lang="less" scoped>

</style>
<script>
	import axios from "../utils/axios.config";
	import manageUserApi from "../api/manageUserApi.js";
	import eventBus from '../utils/eventBus.js';
	export default {
        inject:['reload'],
        data() {
            return {
                
            }
        },
        methods: {
            
        },
	}
</script>
