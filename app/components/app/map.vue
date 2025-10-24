<script setup lang="ts">
import { MglMap, MglMarker, MglNavigationControl } from "@indoorequal/vue-maplibre-gl";

import { MAP_CENTER, MAP_ZOOM } from "~/lib/constants";

const colorMode = useColorMode();
const mapStore = useMapStore();
const style = computed(() => {
  return colorMode.value === "dark" ? "/styles/dark.json" : "https://tiles.openfreemap.org/styles/liberty";
});

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="MAP_CENTER"
    :zoom="MAP_ZOOM"
  >
    <MglNavigationControl />
    <MglMarker v-for="point in mapStore.mapPoints" :key="point.id" :coordinates="{ lat: point.lat, lon: point.lng }">
      <template #marker>
        <div class="tooltip tooltip-top" data-tip="hello">
          <icon name="tabler:map-pin-filled" size="30" class="text-secondary" />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>

<style lang="css">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
