<script setup lang="ts">
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";

import { MglMap, MglMarker, MglNavigationControl, MglPopup } from "@indoorequal/vue-maplibre-gl";

import { MAP_CENTER, MAP_ZOOM } from "~/lib/constants";

const colorMode = useColorMode();
const mapStore = useMapStore();
const locationStore = useLocationStore();
const { locations } = storeToRefs(locationStore);
const style = computed(() => {
  return colorMode.value === "dark" ? "/styles/dark.json" : "https://tiles.openfreemap.org/styles/liberty";
});

function updateSelectedPoint(point: { lat: number; lng: number }) {
  if (mapStore.selectedPoint) {
    mapStore.selectedPoint = { lat: point.lat, lon: point.lng };
  }
}

function onDoubleClick({ event }: MglEvent<"dblclick">) {
  if (mapStore.selectedPoint) {
    mapStore
      .selectedPoint = { lat: event.lngLat.lat, lon: event.lngLat.lng };
  }
}

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="MAP_CENTER"
    :zoom="MAP_ZOOM"
    @map:dblclick="onDoubleClick"
  >
    <MglNavigationControl />
    <MglMarker
      v-if="mapStore.selectedPoint"
      class-name="z-50"
      :coordinates="mapStore.selectedPoint || MAP_CENTER"
      draggable
      @update:coordinates="updateSelectedPoint"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top tooltip-open cursor-pointer"
          data-tip="Drag to your desired location"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="35"
            class="text-warning"
          />
        </div>
      </template>
    </MglMarker>
    <MglMarker v-for="location in locations" :key="location.id" :coordinates="{ lat: location.lat, lon: location.long }">
      <template #marker>
        <div
          class="tooltip tooltip-top cursor-pointer"
          :class="{ 'tooltip-open': mapStore.selectedLocation?.id === location.id }"
          :data-tip="location.name"
          @mouseenter="mapStore.selectLocation(location)"
          @mouseleave="mapStore.selectLocation(null)"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            :class="mapStore.selectedLocation?.id === location.id ? 'text-accent' : 'text-secondary'"
          />
        </div>
      </template>
      <MglPopup>
        <h3 class="text-xl">
          {{ location.name }}
        </h3>
        <p v-if="location.description">
          {{ location.description }}
        </p>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>

<style lang="css">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
