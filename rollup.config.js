import includePaths from 'rollup-plugin-includepaths'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

let includePathOptions = {
	include: {},
	paths: ['src', 'src/systems'],
	external: [],
	extensions: ['.js']
}

export default {
	entry: 'src/index.js',
	format: 'iife',
	dest: 'dist/bundle.js',
	plugins: [
		includePaths(includePathOptions),
		nodeResolve({
			browser: true,
			preferBuiltins: false,
			jsnext: true,
			main: true
		}),
		commonjs({
			ignoreGlobal: true,
			include: 'node_modules/**'
		}),
		json(),
		babel(),
		uglify()
	]
}
