import externals from 'rollup-plugin-node-externals'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'app.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    externals({}),
    babel({
      include: /\.js$/,
      exclude: /node_modules/,
      extensions: ['.js', '.jsx'],
      babelHelpers: 'runtime',
    }),
  ],
}
