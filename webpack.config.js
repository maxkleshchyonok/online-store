const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    }
};

const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] })];


module.exports = ({develop}) => ({
    resolve: {
        alias: {
        src: path.resolve(__dirname, './src'),
        // Production build files
        build: path.resolve(__dirname, './dist'),
        // Static files that get copied to build folder
        public: path.resolve(__dirname, '../public'),
        //resources
        images: path.resolve(__dirname, './assets/img')
        },
        extensions: ['.ts', '.js']
    },
    mode: develop ? 'development' : 'production',
    devtool: develop ? 'inline-source-map' : false,
    entry: {
        app: 'src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets'),
                    to: 'assets'
                }
            ]
        }),
        ...esLintPlugin(develop),
    ],
    ...devServer(develop),
});
