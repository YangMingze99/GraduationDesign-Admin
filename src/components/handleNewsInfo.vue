<template>
	<div>
		<el-page-header @back="goBack" content="编辑页"></el-page-header>
		<el-divider></el-divider>
		<el-form ref="form" :model="form" label-width="130px">
			<el-form-item label="新闻标题">
				<el-input v-model="form.newsTitle"></el-input>
			</el-form-item>
			<el-form-item label="发布人">
				<el-input v-model="form.newsAuthor"></el-input>
			</el-form-item>
			<el-form-item label="选择子栏目">
				<el-select v-model="form.childrenId" placeholder="请选择子栏目" required>
					<el-option v-for="item in routerParams.NavItems" :key="item.classId" :label="item.itemName" :value="item.classId"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="新闻浏览量">
				<el-input v-model="form.newsClicks"></el-input>
			</el-form-item>
			<el-form-item label="是否展示在轮播区">
				<el-switch v-model="form.isBanner"></el-switch>
			</el-form-item>
			<el-form-item label="新闻缩略图" v-model="form.newsPictures">
				<el-upload name="usericon" class="avatar-uploader" action="http://localhost:3000/home/uploadImagePreview"
				 :show-file-list="false" :on-success="handleAvatarSuccess">
				 <div v-if="pageType == 'add'">
					<img v-if="form.newsPictures" :src="'' + imageUrl" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				 </div>
				 <div v-else>
					<img v-if="form.newsPictures" :src="'' + imageUrl" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				 </div>
					
				</el-upload>
			</el-form-item>
			<el-form-item label="新闻正文">
				<quill-editor class="quill-editor" v-model="form.newsText" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
				 @focus="onEditorFocus($event)" @change="onEditorChange($event)">
				</quill-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSubmitClick()">保存</el-button>
				<el-button type="reset">重置</el-button>
			</el-form-item>
		</el-form>
		<el-upload name="textPic" id="hiddenNewsTextUpload" style="display: none" :show-upload-list="false" :on-success="handleSuccess"
		 :format="['jpg', 'jpeg', 'png', 'gif']" multiple action="http://localhost:3000/home/uploadImagePreviewForText">
		</el-upload>
	</div>
</template>
<style lang="less" scoped>
	.quill-editor {
		line-height: normal;
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
		width: 100%;
		height: 178px;
		display: block;
	}
</style>
<script>
	import jwt from "jsonwebtoken";
	import axios from "../utils/axios.config";
	import newsItemApi from '../api/newsItemApi'
	//富文本编辑器相关
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	import Quill from "quill";
	import {quillEditor} from "vue-quill-editor";
	import ImageResize from 'quill-image-resize-module' //添加
	Quill.register('modules/imageResize', ImageResize) //添加
	//富文本编辑器相关结束

	export default {
		components: {
			quillEditor,
		},
		data() {
			return {
				pageType:'',
				baseURL:'',
				newsId:undefined,
				imageUrl: "",
				routerParams: {},
				form: {
					isBanner: false,
					parentId: undefined,
					newsAuthor: "",
					newsClicks: 0,
					newsPictures: "",
					newsLikes: 0,
					newsText: "",
				},
				editorOption: {
					modules: {
						imageResize: {
							displayStyles: {
								backgroundColor: "black",
								border: "none",
								color: "white",
							},
							modules: ["Resize", "DisplaySize", "Toolbar"],
						},
						toolbar: {
							container: [
								["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
								["blockquote", "code-block"], //引用，代码块
								[{
										header: 1,
									},
									{
										header: 2,
									},
								], // 标题，键值对的形式；1、2表示字体大小
								[{
										list: "ordered",
									},
									{
										list: "bullet",
									},
								], //列表
								[{
										script: "sub",
									},
									{
										script: "super",
									},
								], // 上下标
								[{
										indent: "-1",
									},
									{
										indent: "+1",
									},
								], // 缩进
								[{
									direction: "rtl",
								}, ], // 文本方向
								[{
									size: ["small", false, "large", "huge"],
								}, ], // 字体大小
								[{
									header: [1, 2, 3, 4, 5, 6, false],
								}, ], //几级标题
								[{
										color: [],
									},
									{
										background: [],
									},
								], // 字体颜色，字体背景颜色
								[{
									font: [],
								}, ], //字体
								[{
									align: [],
								}, ], //对齐方式
								["clean"], //清除字体样式
								["image"], //上传图片、上传视频
							],
							handlers: {
								image: function(value) {
									if (value) {
										// 调用iview图片上传
										document.querySelector("#hiddenNewsTextUpload input").click();
									} else {
										this.quill.format("image", false);
									}
								},
							},
						},
					},
					placeholder: "输入内容...",
				}, //编辑器配置项
			};
		},
		created() {
			this.getRouterParams();
			if(this.newsId){
				this.getNewsInfo()
			}
		},
		methods: {
			onEditorBlur() {}, // 失去焦点触发事件
			onEditorFocus() {}, // 获得焦点触发事件
			onEditorChange() {}, // 内容改变触发事件
			handleSuccess(response, file, fileList) {
				// 获取富文本组件实例
				let quill = this.$refs.myQuillEditor.quill;
				// 如果上传成功返回图片URL
				if (response) {
					// 获取光标所在位置
					let length = quill.getSelection().index;
					// 插入图片，res为服务器返回的图片链接地址
					quill.insertEmbed(
						length,
						"image",
						axios.defaults.baseURL + "/public/images/newTextPic/" + response
					);
					// 调整光标到最后
					quill.setSelection(length + 1);
				} else {
					// 提示信息，需引入Message
					Message.error("图片插入失败");
				}
			},
			goBack() {
				this.$router.go(-1);
			},
			getRouterParams() {
				const token = localStorage.getItem("routerParams");
				jwt.verify(token, "SNSD", (error, decode) => {
					if (!error) {
						this.$data.newsId = decode.data.newsId? decode.data.newsId :undefined;
						this.$data.pageType = decode.data.type;
						this.$data.routerParams = decode.data;
						this.$data.form.parentId = decode.data.roleID;
					}
				});
				this.$data.baseURL = axios.defaults.baseURL
			},
			getNewsInfo(){
				newsItemApi.getNewsDetailByNewsId(this.newsId).then((result) => {
					this.$data.form = result.data[0]
					this.imageUrl = axios.defaults.baseURL+this.$data.form.newsPictures
				}).catch((err) => {});
			},
			handleSubmitClick() {
				if(this.newsId){
					console.log("修改");
				}else{
					newsItemApi.addNewsItem(this.form).then((result) => {
						
					}).catch((err) => {});
					console.log("新增");
				}
			},
			handleAvatarSuccess(response, file, fileList) {
				this.imageUrl = axios.defaults.baseURL + "/images_temp/" + response;
				this.form.newsPictures = response;
			},
		},
		beforeRouteEnter: (to, from, next) => {
			// ...
			const data = to.params;
			const token = jwt.sign({
					data,
				},
				"SNSD"
			);
			localStorage.setItem("routerParams", token);
			next();
		},
		beforeRouteLeave(to, from, next) {
			localStorage.removeItem("routerParams");
			next();
		},
	};
</script>
