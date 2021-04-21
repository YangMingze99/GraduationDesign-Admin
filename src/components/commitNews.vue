<template>
	<div>
		<span>新闻审核</span>
		<el-divider></el-divider>
		<el-table ref="multipleTable" :data="newsItem" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column label="文章标题" prop="newsTitle"> </el-table-column>
			<el-table-column width="180px" label="更新时间" prop="update_time" :formatter="dateFormat"></el-table-column>
			<el-table-column align="right">
				<template slot-scope="scope">
                    <el-button type="success" size="mini" style="margin-left:8px"  @click="handleCommit(scope.$index, scope.row)">通过审核</el-button>
					<el-button type="primary" size="mini" style="margin-left:8px"  @click="handleEdit(scope.$index, scope.row)">查看/编辑</el-button>
					<el-popconfirm confirm-button-text="好的" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？"
					 @confirm="handleDelete(scope.$index, scope.row)">
						<el-button slot="reference" style="margin-left:8px" size="mini" type="danger">删除</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import navItemApi from "../api/navItemApi.js";
	import newsItemApi from "../api/newsItemApi.js";
	export default {
		data() {
			return {
				newsItem:[],
                currentChildNavItems:[]
			}
		},
        created() {
            this.getNewsItem();
        },
		methods:{
			getChildNavItems(that,newsId,modelId) {
				navItemApi
					.getNavItemByParentId(modelId)
					.then((result) => {
						that.$data.currentChildNavItems = result.data;
                        that.$router.push({
					    name: "handleNewsInfo",
					    params: {
						    newsId: newsId,
						    roleID: modelId,
						    NavItems: that.currentChildNavItems,
						    type: "edit",
					    },
				        });
					})
					.catch((err) => {});
			},
			getNewsItem(){
				newsItemApi.getUnCheckedNewItem().then((result) => {
                    this.$data.newsItem = result.data
                }).catch((err) => {});
			},
            handleCommit(index, row){
                console.log(row._id);
                newsItemApi.commitNewsItem(row._id).then((result) => {
                    if (result.code == "666") {
						this.$alert("审核成功！", "操作结果", {
							confirmButtonText: "确定",
							callback: (action) => {
								this.$router.go(0);
							},
						});
					}
                }).catch((err) => {});
            },
			handleEdit(index, row){
                this.$options.methods.getChildNavItems(this,row._id,row.parentId);
			},
			handleDelete(index, row) {
				newsItemApi.deleteNewItem(row._id).then((result) => {
					if (result.code == "666") {
						this.$alert("删除成功！", "操作结果", {
							confirmButtonText: "确定",
							callback: (action) => {
								this.$router.go(0);
							},
						});
					}
				}).catch((err) => {});
			},
			handleSelectionChange(value){
				console.log(value);
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
		}
	}
</script>
