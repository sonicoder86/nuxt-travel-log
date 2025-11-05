import type { Location } from "~/lib/db/schema";

export const useMapStore = defineStore("mapStore", () => {
  const selectedLocation = ref<Location | null>(null);
  const flyTo = ref(true);
  const selectedPoint = ref<{ lat: number; lon: number } | null>(null);
  const locationStore = useLocationStore();
  const { locations } = storeToRefs(locationStore);

  function selectLocation(location: Location | null) {
    selectedLocation.value = location;
  }

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();
    let bounds: any | null = null;

    effect(() => {
      if (!locations.value) {
        return;
      }

      const firstLocation = locations.value[0];
      if (!firstLocation) {
        return;
      }

      bounds = locations.value.reduce(
        (bounds, location) => {
          return bounds.extend({ lat: location.lat, lng: location.long });
        },
        new LngLatBounds(
          { lat: firstLocation.lat, lng: firstLocation.long },
          { lat: firstLocation.lat, lng: firstLocation.long },
        ),
      );
      map.map?.fitBounds(bounds, { padding: 60 });
    });

    watch(selectedPoint, (newValue, oldValue) => {
      if (newValue && !oldValue) {
        map.map?.flyTo({
          center: newValue,
          speed: 0.8,
          zoom: 6,
        });
      }
    }, { immediate: true });
  }

  return { init, selectedLocation, flyTo, selectLocation, selectedPoint };
});
