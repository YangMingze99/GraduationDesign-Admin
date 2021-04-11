<template>
	<div>
		<span>修改登录密码</span>
		<el-divider></el-divider>
		<el-form label-width="100px" :model="formData" :rules="editPasswordFormRules" ref="editPasswordForm" status-icon>
			<el-form-item label="新密码" prop="password">
				<el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认新密码" prop="checkPassword">
				<el-input type="password" v-model="formData.checkPassword" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('editPasswordForm')">修改密码</el-button>
				<el-button @click="resetForm('editPasswordForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style lang="less">

</style>
<script>
	import axios from "../utils/axios.config";
	import manageUserApi from "../api/manageUserApi.js";
	import eventBus from '../utils/eventBus.js';
	export default {
		data() {
			let validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					if (this.formData.checkPassword !== "") {
						this.$refs.editPasswordForm.validateField("checkPassword");
					}
					callback();
				}
			};
			let validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.formData.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				formData: {
					password: "",
					checkPassword: "",
				},
				editPasswordFormRules: {
					password: [{
						validator: validatePass,
						trigger: "blur",
					}, ],
					checkPassword: [{
						validator: validatePass2,
						trigger: "blur",
					}, ]
				}
			}
		},
		created() {
			this.setData()
		},
		methods: {
			setData() {
				this.formData.userId = eventBus.$data.userInfo.data[0]._id;
			},
			submitForm(formName) {
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						manageUserApi.editPassword(_this.formData).then((result) => {
								if (result.code == 666) {
									this.$alert("修改成功！请重新登录", "操作结果", {
										confirmButtonText: "确定",
										callback: (action) => {
                                            window.localStorage.removeItem('user-token');
                                            this.$router.push({
                                                path: '/login'
                                            })
                                            this.$router.go(0)

										},
									});
								}
							})
							.catch((err) => {});
					} else {
						return false;
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
