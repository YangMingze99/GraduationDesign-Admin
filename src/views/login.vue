<template>
	<div class="login">
		<el-card shadow="always" v-loading="loading">
			<div class="logo">
				<img class="img" src="@/assets/images/logo.png" alt="" width="80px" height="80px" srcset="">
			</div>
			<el-form label-width="80px" ref="loginForm" :rules="loginFormRules" :model="loginForm" size="normal" style="margin-top:20px">
				<el-form-item label="用户名:" prop="username">
					<el-input placeholder="请输入用户名" v-model="loginForm.username" size="medium" prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<el-form-item label="密 码:" prop="password">
					<el-input placeholder="请输入用户密码" show-password v-model="loginForm.password" size="medium" prefix-icon="el-icon-key"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button round type="success" @click="loginbtn" style="width: 90%;margin-top:15px">登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
	.login {
		height: 100vh;
		background: url("../assets/images/loginbg.jpg") no-repeat;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;

		.el-card {
			width: 430px;
			height: 380px;
			background-color: rgba(255, 255, 255, 0.75);

			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
<script>
	export default {
		name: 'loginView',
		data() {
			return {
				loading: false,
				loginForm: {
					username: '',
					password: ''
				},
				loginFormRules: {
					username: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}],
					password: [{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					}]
				},
			}
		},
		methods: {
			loginbtn() {
				//判定form表单验证是否通过
				this.$refs.loginForm.validate((isOk) => {
					// console.log(isOk);
					if (isOk) {
						this.loading = true;
						setTimeout(() => {
							this.$axios({
								url: '/login/checklogin',
								method: 'post',
								data: this.loginForm
							}).then((result) => {
								// console.log(result);
								if (result) {
									window.localStorage.setItem('user-token', result.token);
									//跳转
									this.$router.push({
										path: '/home'
									});
								}
							}).catch((err) => {
								console.log(err);
							});
						},2000*Math.random());
					}
				})
			}
		},
	}
</script>
