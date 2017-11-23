const webpack=require('webpack');
const providePlugin=new webpack.ProvidePlugin({
	$:'jquery',
	vue:'vue'
});
const commonsChunk=new webpack.optimize.CommonsChunkPlugin({
	name:'jquery',
	filename:'../common/common.js',
	minChunks:2
});
module.exports={
	resolve: {
        extensions: ['.js', '.vue','.scss','.css','.pug','.html','.json'],
        alias: {
		    swiperjs:'swiper/dist/js/swiper.js',
		    swipercss:'swiper/dist/css/swiper.css'
		}
    },
    module:{
    	rules:[
    		{
		        test: /\.vue$/,
		        exclude: /node_modules/,
		        use: ['vue-loader']
		    },
    	]
    },
	plugins: [
	    providePlugin,
	    //commonsChunk
	]
}