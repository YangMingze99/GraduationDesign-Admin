const webpack = require("webpack")
module.exports = {
    lintOnSave : false,
	// 配置插件参数
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
			})
		]
	}
}