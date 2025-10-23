import VueMaplibreGl from "@indoorequal/vue-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default defineNuxtPlugin({
  name: "map-libre",
  enforce: "pre", // or 'post'
  async setup(nuxtApp) {
    nuxtApp.vueApp.use(VueMaplibreGl);
  },
});
