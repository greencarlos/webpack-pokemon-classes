const path = require("path");

module.exports = {
  entry: {
    stars: "./src/stars.js",
    kanban: "./src/kanban.js",
    pokemon: "./src/pokemon.js",
    addLessons: "./src/addLessons.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/, // Regex for all JavaScript file
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "public/dist"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
  },
};
