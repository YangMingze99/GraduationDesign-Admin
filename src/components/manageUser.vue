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
					<el-button size="mini" v-if="currentUser == 'admin' || scope.row.username == currentUser" @click="handleEditClick(scope.row._id, scope.row)">编辑</el-button>
					<!-- 修改表单 -->
					<el-dialog title="修改用户信息" :visible.sync="editDialogFormVisible">
						<el-form :model="editFormData" ref="editForm">
							<el-form-item label="用户id" :label-width="formLabelWidth">
								<el-input v-model="editFormData._id" autocomplete="off" disabled></el-input>
							</el-form-item>
							<el-form-item label="用户名" :label-width="formLabelWidth">
								<el-input v-model="editFormData.username" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="用户昵称" :label-width="formLabelWidth">
								<el-input v-model="editFormData.nickname" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="性别" :label-width="formLabelWidth">
								<el-select v-model="editFormData.gender">
									<el-option label="女" value="0"></el-option>
									<el-option label="男" value="1"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="用户年龄" :label-width="formLabelWidth">
								<el-input v-model="editFormData.age" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="用户介绍" :label-width="formLabelWidth">
								<el-input type="textarea" v-model="editFormData.introduce" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="用户头像" :label-width="formLabelWidth" v-model="editFormData.avatar">
								<el-upload name="usericon" class="avatar-uploader" action="http://localhost:3000/home/uploadImagePreview"
								 :show-file-list="false" :on-success="handleAvatarSuccess">
									<img :src="axiosUrl+editFormData.avatar" alt="" width="100" height="100" style="border-radius:10px ;" />
								</el-upload>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="editDialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submitEdit()">确 定</el-button>
						</div>
					</el-dialog>
					<!-- 修改表单结束 -->
					<el-button size="mini" style="margin-left:10px" v-if="currentUser=='admin' && scope.row.username != 'admin'" type="danger"
					 @click="handleDelete(scope.row._id, scope.row)">删除</el-button>
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
	import eventBus from '../utils/eventBus.js';

	export default {
		inject:['reload'],
		data() {
			return {
				tableData: [],
				axiosUrl: axios.defaults.baseURL,
				editDialogFormVisible: false,
				currentUser: eventBus.$data.userInfo.data[0].username,
				editFormData: {},
				formLabelWidth: '100px'
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
			handleAvatarSuccess(response, file, fileList) {
				this.editFormData.avatar = "/images_temp/" +response;
				this.editFormData.newAvatar = response;
			},
			getAllUsers() {
				manageUserApi
					.getAllUser()
					.then((result) => {
						this.tableData = result.data;
					})
					.catch((err) => {});
			},
			handleEditClick(id, row) {
				this.editDialogFormVisible = true;
				manageUserApi.getUserById(id).then((result) => {
					this.editFormData = result.data;
					this.editFormData.gender = this.editFormData.gender+''
				}).catch((err) => {
					console.warn(err);
				});
			},
			submitEdit(){
				this.editDialogFormVisible = false;
				this.editFormData.gender = parseInt(this.editFormData.gender);
				manageUserApi.editUser(this.editFormData).then((result) => {
					if (result.code == 666) {
						this.$alert("修改成功！", "操作结果", {
							confirmButtonText: "确定",
							callback: (action) => {
								this.reload()
							},
						});
					}
				}).catch((err) => {
					console.warn(err);
				});
			},
			handleDelete(id, row) {
				manageUserApi.deleteUserById(id).then((result) => {
					if (result.code == 666) {
						this.$alert("删除成功！", "操作结果", {
							confirmButtonText: "确定",
							callback: (action) => {
								// this.$router.go(0);
								this.reload()
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
