const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'extension-build.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('Archive has been finalized and the output file descriptor has closed.');
});

archive.on('warning', (err) => {
  if (err.code !== 'ENOENT') {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

archive.directory('dist/', false);

archive.finalize();
