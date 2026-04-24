import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // base: command === "build" ? "/alpha" : "/", // Uncomment if deploying to a sub-path like `/alpha`
   assetsInclude: ["**/*.JPG", "**/*.JPEG", "**/*.PNG", "**/*.WEBP", "**/*.AVIF"],
  
  server: {
    host: "0.0.0.0", // Allow access on the local network
    port: 8080,
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";

// export default defineConfig(({ command }) => ({
//   base: command === "build" ? "/alpha/" : "/", // IMPORTANT: trailing slash

//   assetsInclude: ["**/*.JPG", "**/*.JPEG", "**/*.PNG", "**/*.WEBP", "**/*.AVIF"],

//   server: {
//     host: "0.0.0.0",
//     port: 8080,
//   },

//   plugins: [react()],

//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },

//   build: {
//     outDir: "dist/", // default, but explicit is better
//     emptyOutDir: true,
    
//   },
// }));