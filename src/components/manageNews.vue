<template>
	<div>
		<div style="display:flex;justify-content: space-between;">
			<span style="display: flex; align-items: center;">{{currentRoleInfo.modelName}}-新闻管理页</span>
			<el-button type="primary" round @click="handle_addButtonClick">发布一条新文章吧</el-button>
		</div>
		<el-divider></el-divider>
		<el-pagination 
			style="padding:8px;background:#ffffff; border-bottom: 1px solid;display: flex;justify-content: flex-end;"
			:page-sizes="[10, 20, 30, 40]" 
			:page-size="pagesize" 
			layout="total, sizes, prev, pager, next, jumper" 
			:total="tableData.filter(data => !currentSelectOption || data.childrenId == currentSelectOption).filter(data => !search || data.newsTitle.toLowerCase().includes(search.toLowerCase())).length"
			:currentPage="currentPage"
			@size-change="size_change"
			@current-change="current_change"
			></el-pagination>
		<div style="position: relative;">
			<el-select style="width:200px;position: absolute;top: 13px;right: 20%;z-index: 2;" 
				v-model="currentSelectOption" size="mini" placeholder="请选择子栏目"
				>
				<el-option key="0" label="全部子栏目" value=""></el-option>
				<el-option v-for="item in currentChildNavItems" style="width:100%" :key="item.classId" 
					:label="item.itemName" :value="item.classId"></el-option>
			</el-select>
			<el-input  style="width:200px;position: absolute;top: 13px;right: 40px;z-index: 2;"  
				v-model="search" size="mini" 
				placeholder="输入标题关键字搜索" />
			<el-table 
				:data="tableData.filter(data => !currentSelectOption || data.childrenId == currentSelectOption).filter(data => !search || data.newsTitle.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)" 
				style="width: 100%">
				<el-table-column label="文章标题" prop="newsTitle">
				</el-table-column>
				<el-table-column width="180px" label="更新时间" prop="update_time" :formatter="dateFormat">
				</el-table-column>
				<el-table-column align="right">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<style lang="less" scoped>

</style>
<script>
	import {
		getRoleInfoById
	} from "../api/getRoleInfo.js"
	import navItemApi from '../api/navItemApi.js'
	import newsItemApi from '../api/newsItemApi.js'
	// tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))
	export default {
		data() {
			return {
				currentRoleId: 0,
				//当前权限信息
				currentRoleInfo: {},
				//当前栏目下全部子分类
				currentChildNavItems: [],
				//当前选中的分类
				currentSelectOption:"",
				//当前栏目下全部新闻
				currentAllNewsItem: [],
				tableData: [],
				search: undefined,
				//分页项
				currentPage:1,
				pagesize:10
			}
		},
		created() {
			this.getCurrentModelId();
			this.getRoleInfo(this.$data.currentRoleId);
		},
		watch: {
			$route() {
				this.getCurrentModelId();
				this.getRoleInfo(this.$data.currentRoleId);
			},
			currentRoleId() {
				this.$nextTick(() => {
					this.$data.currentSelectOption = ''
					this.getRoleInfo(this.$data.currentRoleId);
				});
			}
		},
		methods: {
			handleEdit(index, row) {
				this.$router.push({name:'handleNewsInfo',params:{newsId:row._id,roleID:this.currentRoleInfo.modelID,NavItems:this.currentChildNavItems,type:'edit'}}) 
			},
			handleDelete(index, row) {
				// console.log(index, row);
			},
			handle_searchInputChange(value){
				this.$forceUpdate();
			},
			handle_addButtonClick(){
				this.$router.push({name:'handleNewsInfo',params:{roleID:this.currentRoleInfo.modelID
,NavItems:this.currentChildNavItems,type:'add'}}) 
			},
			size_change:function(size){
				this.pagesize = size;
			},
			current_change:function(currentPage){
        		this.currentPage = currentPage;
      		},
			dateFormat: function(row, column) {
				var t = new Date(row.update_time); //row 表示一行数据, updateTime 表示要格式化的字段名称
				return (
					t.getFullYear() +
					"-" +
					(t.getMonth() + 1) +
					"-" +
					t.getDate() +
					" " +
					t.getHours() +
					":" +
					t.getMinutes() +
					":" +
					t.getSeconds()
				);
			},
			getCurrentModelId() {
				this.currentRoleId = Number(this.$route.params.id)
			},
			getRoleInfo(id) {
				getRoleInfoById(id).then((result) => {
					if (result.code == 666) {
						this.currentRoleInfo = result.result;
						this.$options.methods.getChildNavItems(this, this.$data.currentRoleInfo.modelID)
						this.$options.methods.getNewsItems(this, this.$data.currentRoleInfo.modelID)
					}
				}).catch((err) => {});
			},
			getChildNavItems(that, id) {
				navItemApi.getNavItemByParentId(id).then((result) => {
					that.$data.currentChildNavItems = result.data
				}).catch((err) => {});
			},
			getNewsItems(that, parentId) {
				newsItemApi.getNewsItemByParentId(parentId).then((result) => {
					that.currentAllNewsItem = result.data;
					that.tableData = result.data;
				}).catch((err) => {});
			}
		}
	}
</script>
