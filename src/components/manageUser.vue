<template>
	<div>
		<span>管理用户</span>
		<el-divider></el-divider>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="用户名">
							<span>{{ props.row.username }}</span>
						</el-form-item>
						<el-form-item label="用户昵称">
							<span>{{ props.row.nickname }}</span>
						</el-form-item>
						<el-form-item label="用户ID">
							<span>{{ props.row._id }}</span>
						</el-form-item>
						<el-form-item label="年龄">
							<span>{{ props.row.age }}</span>
						</el-form-item>
						<el-form-item label="性别">
							<span>{{ props.row.gender == 0? '女':'男' }}</span>
						</el-form-item>
						<el-form-item label="用户头像">
							<span><img :src="axiosUrl+props.row.avatar" alt="" width="60" height="60" style="border-radius:10px ;"></span>
						</el-form-item>
						<el-form-item label="个人描述">
							<span>{{ props.row.introduce }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="用户ID" prop="_id"> </el-table-column>
			<el-table-column label="用户名" prop="username"> </el-table-column>
			<el-table-column label="注册时间" prop="update_time" :formatter="dateFormat">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row._id, scope.row)">编辑</el-button>
					<el-button size="mini" v-if="scope.row.username!='admin'	" type="danger" @click="handleDelete(scope.row._id, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<style lang="less" scoped>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
<script>
	import axios from "../utils/axios.config";
	import manageUserApi from "../api/manageUserApi.js";
	export default {
		data() {
			return {
				tableData: [],
				axiosUrl: axios.defaults.baseURL
			};
		},
		methods: {
			//时间格式化
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
			getAllUsers() {
				manageUserApi
					.getAllUser()
					.then((result) => {
						this.tableData = result.data;
					})
					.catch((err) => {});
			},
			handleEdit(index, row) {

			},
			handleDelete(id, row) {
				// console.log(id,'id');
				// console.log(row,'row');
				manageUserApi.deleteUserById(id).then((result) => {
					if (result.code == 666) {
						this.$alert("删除成功！", "操作结果", {
							confirmButtonText: "确定",
							callback: (action) => {
								this.$router.go(0);
							},
						});
					}
				}).catch((err) => {

				});
			},
		},
		created() {
			this.getAllUsers();
		},
	};
</script>
