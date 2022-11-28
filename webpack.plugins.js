const path = require("path")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(), 
  new CopyWebpackPlugin({
    patterns:[
      {
        from: path.resolve(__dirname, 'src/music.mp3',),
        to: path.resolve(__dirname, '.webpack/renderer/main_window/music.mp3')
      },
      {
        from: path.resolve(__dirname, 'src/words',),
        to: path.resolve(__dirname, '.webpack/renderer/words')
      },
      {
        from: path.resolve(__dirname, 'src/words',),
        to: path.resolve(__dirname, 'node_modules/electron/dist/Electron.app/Contents/Resources/electron.asar/words')
      },
      {
        from: path.resolve(__dirname, 'src/words',),
        to: path.resolve(__dirname, 'node_modules/electron/dist/words')
      }
    ]
  })
];
