const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const chokidar = require('chokidar');
const parse = require('react-docgen').parse;

const paths = {
  components: path.join(__dirname, '..', 'src', 'components'),
  output: path.join(__dirname, '..', 'config', 'componentData.js')
};

let errors = [];

const watchMode = process.argv.includes('--watch');

generate();

if (watchMode) {
  chokidar.watch([paths.components]).on('change', generate);
}

function generate() {
  const componentData = getDirectories(paths.components).map(componentName => {
    try {
      return getComponentData(componentName);
    } catch (err) {
      errors.push(
        `An error occurred while attempting to generate metadata for ${componentName}: ${err}`
      );
    }
  });

  fs.writeFileSync(
    paths.output,
    `module.exports = ${JSON.stringify(errors.length ? errors : componentData)}`
  );

  if (errors.length) {
    errors.forEach(err => {
      console.error(chalk.red(err));
    });
    errors = [];
  }
}

function getComponentData(componentName) {
  const content = fs.readFileSync(
    path.join(paths.components, componentName, `${componentName}.js`),
    'utf-8'
  );

  const metadata = parse(content);

  return {
    ...metadata,
    name: componentName,
    code: content
    // examples could be added
  };
}

function getDirectories(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());
}
