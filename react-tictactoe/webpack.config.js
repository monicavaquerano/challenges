const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV ?? 'development',
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /.jsx?$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env",
                                ["@babel/preset-react", { runtime: "automatic" }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
};