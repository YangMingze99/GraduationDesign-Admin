<template>
	<div class="container">
		<span>新增用户</span>
		<el-divider></el-divider>
		<el-form :model="ruleForm" status-icon :rules="addUserRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户昵称" prop="nickname">
				<el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model="ruleForm.gender">
					<el-radio label="1">男</el-radio>
					<el-radio label="0">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPassword">
				<el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input v-model.number="ruleForm.age"></el-input>
			</el-form-item>
			<el-form-item label="自我介绍" prop="introduce">
				<el-input type="textarea" v-model="ruleForm.introduce"></el-input>
			</el-form-item>
			<el-form-item label="用户头像" v-model="ruleForm.imageUrl">
				<el-upload name="usericon"
				 class="avatar-uploader" action="http://localhost:3000/home/uploadImagePreview"
				 :show-file-list="false" :on-change="handleAvatarChange" 
				 :on-success="handleAvatarSuccess">
					<img v-if="ruleForm.imageUrl" :src="'' + imageUrl" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style lang="less" scoped="scoped">
	.container {
		width: 85%;
		margin: 20px auto;
	}

	.avatar-uploader {
		width: 300px;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;

		.el-upload {
			width: 100%;
		}
	}

	.avatar-uploader:hover {
		border-color: #409eff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100%;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
<script>
	import axios from "../utils/axios.config";
	import manageUserApi from "../api/manageUserApi.js";
	export default {
		data() {
			let checkAge = (rule, value, callback) => {
				if (!value) {
					return callback(new Error("年龄不能为空"));
				}
				setTimeout(() => {
					if (!Number.isInteger(value)) {
						callback(new Error("请输入数字值"));
					} else {
						callback();
					}
				}, 1000);
			};
			let validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					if (this.ruleForm.checkPassword !== "") {
						this.$refs.ruleForm.validateField("checkPassword");
					}
					callback();
				}
			};
			let validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.ruleForm.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				imageUrl: "",
				ruleForm: {
					username: "",
					nickname: "",
					gender: "",
					password: "",
					checkPassword: "",
					age: "",
					introduce: "",
					imageUrl: "",
				},
				addUserRules: {
					password: [{
						validator: validatePass,
						trigger: "blur",
					}, ],
					checkPassword: [{
						validator: validatePass2,
						trigger: "blur",
					}, ],
					username: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					}, ],
					nickname: [{
						required: true,
						message: "请输入用户昵称",
						trigger: "blur",
					}, ],
					gender: [{
						required: true,
						message: "请选择性别",
						trigger: "change",
					}, ],
					age: [{
						validator: checkAge,
						trigger: "blur",
					}, ],
				},
			};
		},
		methods: {
			handleAvatarSuccess(response, file, fileList) {
				this.imageUrl = axios.defaults.baseURL + "/images_temp/" + response;
				this.ruleForm.imageUrl = response;
			},
			handleAvatarChange(res, file) {},
			submitForm(formName) {
				let _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						manageUserApi.addNewUser(_this.ruleForm).then((result) => {
								if (result.code == 666) {
									this.$alert("添加成功！", "操作结果", {
										confirmButtonText: "确定",
										callback: (action) => {
											this.resetForm('ruleForm');
										},
									});
								}
							})
							.catch((err) => {});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.ruleForm.imageUrl = "";
				this.$refs[formName].resetFields();
			},
		},
	};
</script>
