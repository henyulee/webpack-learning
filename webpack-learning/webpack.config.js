let webpack = require('webpack');

let definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

//commonsPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),//处理公共文件
let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'); // 引入插件
//有时候可能希望项目的样式能不要被打包到脚本中，而是独立出来作为.css，然后在页面中以<link>标签引入
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry:{
		Main:'./src/js/main.js'
	},
	output:{
		path: __dirname+'/build', // 图片和js会放在这
    	//publicPath: 'http://mycdn.com/', // 这里用来生成图片的地址
		filename:'[name].bunble.js'
	},
	module:{
		loaders:[
			{
				test:/\.coffee$/, // test 去判断是否为.coffee的文件,是的话就是进行coffee编译
				loader:'coffee-loader'
			},
			{
				test:/\.js$/, // test 去判断是否为.js,是的话就是进行es6和jsx的编译
				loader:'babel-loader',
				query:{
					presets:['es2015', 'react']
				}
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'// 用!去链式调用loader
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|jpeg|png|gif)$/,
				loader:'url-loader?limit=8192'// 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
			},
			//在 AMD/CMD 中，我们需要对不符合规范的模块（比如一些直接返回全局变量的插件）进行 shim 处理
            { 
            	test: require.resolve("./src/js/tools/swiper.js"),  
            	loader: "exports?swipe"
            }
		]
	},
	resolve: {
	    // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
	    extensions: ['.js', '.coffee','jpg','css']
	},
	plugins:[definePlugin,commonsPlugin]
}