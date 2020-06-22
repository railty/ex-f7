import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from "rollup-plugin-css-only";
//import autoPreprocess from 'svelte-preprocess';
//import scss from 'rollup-plugin-scss';

const production = !process.env.ROLLUP_WATCH;

export default ['item'].map((name, index) => ({
	input: `src/${name}/main.js`,
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `public/build/${name}.js`
	},
	plugins: [
		css({ output: "public/build/extra.css" }),		
		//scss(),		
		svelte({
			//preprocess: autoPreprocess(),
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write(`public/build/${name}.css`);
			},
			onwarn: (warning, handler) => {
				if (warning.code == 'a11y-missing-attribute' && warning.message == 'A11y: <a> element should have an href attribute') return;
				if (warning.code == 'a11y-invalid-attribute' && warning.message == "A11y: '#' is not a valid href attribute") return;
				console.log("warning:");
				console.log(warning);
				// let Rollup handle all other warnings normally
				handler(warning);
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs({
			namedExports: {
				// left-hand side can be an absolute path, a path
				// relative to the current directory, or the name
				// of a module in node_modules
				//'node_modules/idb/build/idb.js': ['deleteDb', 'openDb'],
				//'idb': ['deleteDb', 'openDb'],
				'node_modules/firebase/dist/index.cjs.js': ['initializeApp', 'firestore', 'auth', 'analytics' ],
				'node_modules/firebase/app/dist/index.esm.js': ['initializeApp', 'firestore', 'auth', 'analytics' ],
				//'node_modules/firebase/app/dist/index.cjs.js': [],
				//'node_modules/firebase/auth/dist/index.cjs.js': ['auth'],
				//'node_modules/firebase/analytics/dist/index.cjs.js': ['analytics']
			}
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		
		!production && livereload({
            watch: `public/build/${name}.*`,
            port: 3000 + index
        }),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}));

function serve() {
	let started = false;

	return {
		writeBundle() {
			/*
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
			*/
		}
	};
}