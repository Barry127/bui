import path from 'path';
import fs from 'fs';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';

process.env.NODE_ENV = 'production';

const plugins = [
  postcss({
    modules: {
      generateScopedName: 'bui_[hash:base64:5]'
    }
  }),
  babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
  replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  resolve(),
  commonjs()
];

const external = ['react'];

const configs = [
  {
    input: path.resolve(__dirname, '..', 'src', 'components', 'index.js'),
    output: [
      {
        name: 'bui',
        file: path.resolve(__dirname, '..', 'lib', 'bui.js'),
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      {
        name: 'bui',
        file: path.resolve(__dirname, '..', 'lib', 'bui.module.js'),
        format: 'es',
        globals: {
          react: 'React'
        }
      }
    ],
    plugins,
    external
  }
];

// es module exports per component
const componentsDir = path.resolve(__dirname, '..', 'src', 'components');
fs.readdirSync(componentsDir)
  .filter(file => fs.statSync(path.join(componentsDir, file)).isDirectory())
  .map(componentName => {
    configs.push({
      input: path.resolve(
        __dirname,
        '..',
        'src',
        'components',
        componentName,
        'index.js'
      ),
      output: [
        {
          name: componentName,
          file: path.resolve(__dirname, '..', 'lib', `${componentName}.js`),
          format: 'es',
          globals: {
            react: 'React'
          }
        }
      ],
      plugins,
      external
    });
  });

export default configs;
