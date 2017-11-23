const webpack=require('webpack');
const webpackMerge=require('webpack-merge');
const base=require('./webpack.base.config');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const extractText=new ExtractTextPlugin('../../css/modules/common.css',{
		allChunks:true
});
const uglify=new webpack.optimize.UglifyJsPlugin({
	  compress: {
	    warnings: false
	  },
	  sourceMap: true
});
module.exports=webpackMerge(base,{
	devtool:`cheap-module-source-map`,
    module:{
    	rules:[
    		{
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: `style-loader`,
		          use: {
		          		loader:`css-loader`,
		          		options:{
		          			minimize:true,
		          			sourceMap: false
		          		}
		          }
		        })
		    },
		    {
		        test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
		          fallback: `style-loader`,
		          use: [
			          	{
			          		loader:`css-loader`,
			          		options:{
			          			minimize:true,
			          			sourceMap: false
			          		}
			          	},
			          	{
			          		loader:`sass-loader`,
			          		options:{
			          			sourceMap: false
			          		}
			          	}
		          ],
		        })
		    },
    		{
    			test:/\.(png|jpg|gif|svg|ico|tiff|woff|eot)$/,
    			use:[
	    			{
	    				loader:`url-loader`,
	    				options:{
	    					limit:5120
	    				}
	    			}
    			]
    		}
    	]
    },
	plugins: [
	    extractText,
	    uglify
	]
});