const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV ?? 'development',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /.tsx?$/i,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
};