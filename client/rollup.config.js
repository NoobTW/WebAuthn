import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'webauthn_client',
      file: 'lib/index.umd.js',
      format: 'umd',
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.js',
    plugins: [
      resolve(),
      commonjs(),
    ],
    external: ['axios'],
    output: [
      { file: 'lib/index.cjs.js', format: 'cjs' },
      { file: 'lib/index.esm.js', format: 'es' },
    ],
  },
];
