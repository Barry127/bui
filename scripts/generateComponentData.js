const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const chokidar = require('chokidar');
const parse = require('react-docgen').parse;

const paths = {
  examples: path.join(__dirname, '..', 'src', 'docs', 'pages', 'components'),
  components: path.join(__dirname, '..', 'src', 'components'),
  output: path.join(__dirname, '..', 'config', 'componentData.js')
};

let errors = [];

const watchMode = process.argv.includes('--watch');

generate();

if (watchMode) {
  chokidar.watch([paths.components, paths.examples]).on('change', generate);
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
    return null;
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
    code: content,
    examples: getExamples(componentName)
  };
}

function getExamples(componentName) {
  const dirPath = path.join(paths.examples, componentName, 'examples');
  let files = [];
  try {
    files = getFiles(dirPath);
  } catch (err) {
    return {};
  }

  return files.reduce((examples, file) => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const name = file.slice(0, -3);
    examples[name] = {
      name,
      file,
      component: componentName,
      code: content
    };

    return examples;
  }, {});
}

function getDirectories(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());
}

function getFiles(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter(file => fs.statSync(path.join(dirPath, file)).isFile());
}
