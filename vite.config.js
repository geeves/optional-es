import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: ["src/Optional.js"],
			fileName: (format, entryName) => `${entryName}.${format}.js`
		},
		minify: "esbuild"
	}
});
