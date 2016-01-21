var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './js/main.js'),
	output: {
    	path: path.resolve(__dirname, './public/assets/scripts'),
    	filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets:[
					'react',
					'es2015'
				]
			}
		}]
	}
};
