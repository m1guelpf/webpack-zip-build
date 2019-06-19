# webpack-zip-build
Webpack plugin to zip files after build

# Installation
```
npm install --save-dev webpack-zip-build
```
Feel free to use `yarn`

# Usage
`webpack.config.js`

```
const WebpackZipBuild = require('webpack-zip-build');

module.exports = {
  // ... Configurations
  output: {
    path: __dirname + '/dist',
  },
  plugins: [
    // ... Other Plugins
    new WebpackZipBuild({
      entries: ['./assets/*', './*.hbs', './package.json', './partials/*'],
      output: path.join(__dirname, './dist/file_name_without_ext'),
      format: 'tar',
    }),
  ],
}
```

Will create archive in the same directory as `output.path` (`__dirname` in the example), `${output.path}.tar.gz` containing all entries that mentioned.

If there is no `entries` property, the plugin will create all compiled assets.

# Options
You can pass options when constructing new plugin like the example above.

- `entries`: `Array` -> Array of glob strings
- `output`: `String` -> `directory/filename_without_ext`
- `format`: `String` -> `tar` or `zip`
- `ext`: `String` -> A different extension to use instead of `tar.gz` or `zip` (without leading .)

# License
MIT License.
Please refer to `LICENSE` file.
