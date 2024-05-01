import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { readFile } from 'fs/promises'

const pJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
)

export default {
  input: 'src/index.tsx',
  output: [
    {
      // deprecate with v2
      file: pJson.main,
      format: 'cjs',
      name: 'react-lib',
    },
    {
      file: pJson.module,
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.rollup.json' }),
    postcss(),
  ],
}
