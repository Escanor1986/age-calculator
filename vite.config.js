import { defineConfig } from "vite";

// La propriété base permet de dire à Vite où se trouvent les fichiers. Sur GitHub Pages, les fichiers ne sont pas à la racine, ils sont dans /nom-du-repo/.

export default defineConfig({
  base: '/age-calculator/',
})
