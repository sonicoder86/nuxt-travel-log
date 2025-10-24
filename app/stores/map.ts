import type { Location } from "~/lib/db/schema";

export const useMapStore = defineStore("mapStore", () => {
  const selectedLocation = ref<Location | null>(null);
  const flyTo = ref(true);
  const locationStore = useLocationStore();
  const { locations } = storeToRefs(locationStore);

  function selectLocation(location: Location | null, flyToValue = true) {
    flyTo.value = flyToValue;
    selectedLocation.value = location;
  }

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();
    let bounds: LngLatBounds | null = null;

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

    effect(() => {
      if (selectedLocation.value) {
        if (flyTo.value) {
          map.map?.flyTo({
            center: { lon: selectedLocation.value.long, lat: selectedLocation.value.lat },
            speed: 0.8,
          });
        }
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, { padding: 60 });
      }
    });
  }

  return { init, selectedLocation, flyTo, selectLocation };
});
