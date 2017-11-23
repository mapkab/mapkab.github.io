const webpack=require('webpack');
const webpackMerge=require('webpack-merge');
const base=require('./webpack.base.config');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const extractText=new ExtractTextPlugin('../../css/modules/common.css',{
		allChunks:true
});
module.exports=webpackMerge(base,{
	watch:true,
	devtool:`source-map`,
    module:{
    	rules:[
    		{
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: `style-loader`,
		          use: {
		          		loader:`css-loader`,
		          		options:{
		          			sourceMap: true
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
			          			sourceMap: true
			          		}
			          	},
			          	{
			          		loader:`sass-loader`,
			          		options:{
			          			sourceMap: true
			          		}
			          	}
		          ],
		        })
		    },
    		{
    			test:/\.(png|jpg|gif|svg|ico|tiff|woff|eot)$/,
    			use:[
	    			{
	    				loader:`url-loader`
	    			}
    			]
    		}
    	]
    },
    plugins: [
	    extractText
	]
});