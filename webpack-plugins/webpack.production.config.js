var webpack = require('webpack'),
	htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool:"eval-source-map",
	entry : "./app/main.js",//__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
	output:{
		path:__dirname+"dist",
		filename:"index.js"
	},
	module:{
		loaders:[
			{
				test:/\.json$/,
				loader:"json-loader"
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:"babel-loader",//在webpack的module部分的loaders里进行配置即可
				query:{
					presets:["es2015","react"]
				}
			},
			{
				test:/\.css$/,
				loader:"style-loader!css-loader!postcss-loader?modules"//感叹号的作用在于使同一文件能够使用不同类型的loader  加modules是为了css的组件化开发  加!postcss是为了补全浏览器前缀
			}
		]
	},
	plugins: [
       new webpack.LoaderOptionsPlugin({
         options: {
           postcss: [
           		require('precss'),
           		require('autoprefixer')
           ]
         }
       }),
       new webpack.BannerPlugin("©soumate.cn 2017 版权所有"),//添加注释
       new htmlWebpackPlugin({
       		template:__dirname+"/app/index.tmpl.html"
       }),
       new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
	
	devServer:{
		port:8080,
		//contentBase: "./public",//本地服务器所加载的页面所在的目录  默认webpack-dev-server会为根文件夹提供本地服务器
	    historyApiFallback: true,//不跳转  在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
	    inline: true,//实时刷新
	    hot:true
	}
};