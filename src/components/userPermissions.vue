<template>
	<div>
		<span>用户权限分配</span>
		<el-divider></el-divider>
		<el-table ref="filterTable" :data="tableData" style="width: 100%">
			<el-table-column prop="_id" label="用户ID" width="300" column-key="_id">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="200">
			</el-table-column>
			<el-table-column prop="update_time" label="注册日期" width="180" :formatter="dateFormat">
			</el-table-column>
			<el-table-column prop="role" label="拥有权限" width="400">
				<template slot-scope="scope">
					<el-tag v-for="(item) in (scope.row.role)" :style="{ marginLeft : 5+'px',marginBottom : 5+'px'}" :key="item" :type="item === '无权限' ? 'danger' : 'success'"
					 disable-transitions> {{item}} </el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-dialog title="分配权限" :visible="dialogVisible" width="130" :show-close='false'>
						<el-alert title="分配权限时请不要将无权限分配给有其他权限的用户,这会导致系统错误" type="error" effect="dark">
						</el-alert>
						<el-transfer :style="{marginLeft:60 +'px'}" v-model="userRole" :data="allRoleArr" :titles="['可分配全选', '已分配权限']"></el-transfer>

						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
						</span>
					</el-dialog>

				</template>
			</el-table-column>
		</el-table>

	</div>
</template>
<style lang="less" scoped>

</style>
<script>
	import axios from "../utils/axios.config";
	import manageUserApi from "../api/manageUserApi.js";
	import eventBus from '../utils/eventBus.js';
	export default {
		inject: ['reload'],
		data() {
			return {
				tableData: [],
				tagsData: [],
				dialogVisible: false,
				userRole: [],
				allRoleArr: [{
						key: '0',
						label: "无权限"
					},
					{
						key: '1',
						label: "学院概况"
					},
					{
						key: '2',
						label: "师资队伍"
					},
					{
						key: '3',
						label: "教学工作"
					},
					{
						key: '4',
						label: "科研工作"
					},
					{
						key: '5',
						label: "实验教学"
					},
					{
						key: '6',
						label: "党建工作"
					},
					{
						key: '7',
						label: "学团工作"
					},
					{
						key: '8',
						label: "招生就业"
					}
				]
			}
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
			filterHandler(value, row, column) {
				const property = column['property'];
				return row.role[property] === value;
			},
			handleClose(done) {
				done();
			},
			handleEdit(index, row) {
				const currentUserId = row._id;
				this.dialogVisible = true;
				manageUserApi.getUserById(currentUserId).then((result) => {
					this.userRole = result.data.role.split(',')
					// this.userRole.forEach((element, index) => {
					// 	let ind = this.tagsData.findIndex((val, index) => val.roleId == element)
					// 	if (ind < 0) this.userRole[index] = "无权限"
					// 	else {
					// 		this.userRole[index] = this.tagsData[ind].modelName
					// 	}
					// })
					// console.log(this.userRole);
				}).catch((err) => {});
			},
			getAllUsers() {
				manageUserApi
					.getAllUser()
					.then((result) => {
						this.tableData = result.data;
						this.tableData.map((item, value) => {
							item.role = item.role.split(',')
							item.role.forEach((element, index) => {
								let ind = this.tagsData.findIndex((val, index) => val.roleId == element)
								if (ind < 0) item.role[index] = "无权限"
								else {
									item.role[index] = this.tagsData[ind].modelName
								}
							});
						})
					})
					.catch((err) => {});
			},
			getAllUserRole() {
				manageUserApi.getAllUserRole().then((result) => {
					this.tagsData = result.data;
				}).catch((err) => {});
			}
		},
		created() {
			this.getAllUserRole();
			this.getAllUsers();
		},
		beforeRouteUpdate (to, from, next) {
			this.getAllUserRole();
			this.getAllUsers();
		}
	}
</script>
