<script setup lang="ts">
import { MglMap, MglNavigationControl } from "@indoorequal/vue-maplibre-gl";

import { MAP_CENTER } from "~/lib/constants";

const colorMode = useColorMode();
const style = computed(() => {
  return colorMode.value === "dark" ? "/styles/dark.json" : "https://tiles.openfreemap.org/styles/liberty";
});
const zoom = 8;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="MAP_CENTER"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>

<style lang="css">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
