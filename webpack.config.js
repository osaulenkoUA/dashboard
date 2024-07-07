module.exports = {
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.node$/,
                loader: 'ignore-loader'
            }
        ]
    }
};
