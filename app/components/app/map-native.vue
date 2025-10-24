<script setup lang="ts">
import { Map, Marker, NavigationControl } from "maplibre-gl";

import { MAP_CENTER, MAP_ZOOM } from "~/lib/constants";

const container = ref<HTMLElement>();
const map = ref<Map>();
const mapStore = useMapStore();
const { mapPoints } = storeToRefs(mapStore);
const style = "https://tiles.openfreemap.org/styles/liberty";

const markers = ref<Marker[]>([]);

onMounted(() => {
  if (!container.value) {
    return;
  }

  map.value = new Map({
    container: container.value,
    zoom: MAP_ZOOM,
    style,
    center: MAP_CENTER,
  });
  map.value.addControl(new NavigationControl(), "top-right");
});

watch([map, mapPoints], ([newMap, newPoints]) => {
  if (!newMap) {
    return;
  }

  // Remove old markers
  markers.value.forEach(marker => marker.remove());
  markers.value = [];

  // Add new markers
  const newMarkers = newPoints.map((point) => {
    const marker = new Marker();
    marker.setLngLat({ lng: point.lng, lat: point.lat });
    return marker;
  });

  markers.value = newMarkers;
  newMarkers.forEach((marker) => {
    marker.addTo(newMap);
  });
});
</script>

<template>
  <div ref="container" />
</template>

<style lang="css">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
