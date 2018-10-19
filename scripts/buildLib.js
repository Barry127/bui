const path = require('path');
const fse = require('fs-extra');

const libPath = path.resolve(__dirname, '..', 'lib');
const files = ['README.md', 'LICENSE'];

Promise.all(files.map(file => copyFile(file))).then(() => createPackageFile());

function copyFile(file) {
  return new Promise(resolve => {
    fse.copy(file, path.resolve(libPath, path.basename(file)), err => {
      if (err) throw err;
      resolve();
    });
  }).then(() => console.log(`Copied ${file} to ${libPath}`));
}

function createPackageFile() {
  const {
    author,
    version,
    description,
    keywords,
    repository,
    license,
    bugs,
    homepage,
    peerDependencies,
    dependencies
  } = require('../package.json');

  const packageData = {
    name: 'bui',
    author,
    version,
    description,
    main: 'bui.js',
    module: 'bui.module.js',
    keywords,
    repository,
    license,
    bugs,
    homepage,
    peerDependencies,
    dependencies
  };

  return new Promise(resolve => {
    const packagePath = path.resolve(libPath, 'package.json');
    const data = JSON.stringify(packageData, null, 2);
    fse.writeFile(packagePath, data, err => {
      if (err) throw err;
      console.log(`Created package.json in ${libPath}`);
      resolve();
    });
  });
}
