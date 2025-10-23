<script setup lang="ts">
import { Map, NavigationControl } from "maplibre-gl";

import { MAP_CENTER } from "~/lib/constants";

const container = shallowRef<HTMLElement>();
const map = shallowRef<Map>();
const style = "https://tiles.openfreemap.org/styles/liberty";
const zoom = 8;

onMounted(() => {
  if (!container.value) {
    return;
  }

  map.value = new Map({
    container: container.value,
    zoom,
    style,
    center: MAP_CENTER,
  });
  map.value.addControl(new NavigationControl(), "top-right");
});
</script>

<template>
  <div ref="container" />
</template>

<style lang="css">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
