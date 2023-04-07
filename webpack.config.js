const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/client.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		})
	],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
				test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		}
	}
};