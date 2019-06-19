'use strict';

const fs = require('fs');
const archiver = require('archiver');

class WebpackZipBuild {
  constructor(options) {
    options = options || {};
    if (typeof options === 'string') {
      this.options = {
        output: options
      };
    } else {
      this.options = options;
    }
  }
  apply(compiler) {
    const options = this.options;
    compiler.plugin('after-emit', (compiler, callback) => {
      // Set output location
      const output = options.output ?
        options.output : compiler.options.output.path;
      // Create archive stream
      let archive;
      let zip = true;
      let tar = true;
      if (options.format) {
        if (typeof options.format === 'string') {
          zip = (options.format === 'zip');
          tar = (options.format === 'tar');
        } else if (Array.isArray(options.format)) {
          // Support later
          zip = (options.format.indexOf('zip') != -1);
          tar = (options.format.indexOf('tar') != -1);
        }
      }
      if (zip) {
        const ext = options.ext || 'zip';
        archive = archiver('zip', {
          zlib: {
            level: 9
          } // Sets the compression level.
        });
        archive.pipe(fs.createWriteStream(`${output}.${ext}`));
      } else if (tar) {
        const ext = options.ext || 'tar.gz';
        archive = archiver('tar', {
          gzip: true,
          gzipOptions: {
            level: 1
          }
        });
        archive.pipe(fs.createWriteStream(`${output}.${ext}`));
      }
      if (options.entries) {
        options.entries.forEach(() => {
          archive.glob(entry);
        });
      } else {
        for (let asset in compiler.assets) {
          if (compiler.assets.hasOwnProperty(asset)) {
            archive.append(fs.createReadStream(compiler.assets[asset].existsAt), {
              name: asset
            });
          }
        }
      }
      archive.finalize();
      callback();
    });
  }
}


module.exports = WebpackZipBuild;
