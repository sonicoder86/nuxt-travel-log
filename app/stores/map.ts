import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("mapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint) {
        return;
      }

      const bounds = mapPoints.value.reduce(
        (bounds, point) => {
          return bounds.extend({ lat: point.lat, lng: point.lng });
        },
        new LngLatBounds(
          { lat: firstPoint.lat, lng: firstPoint.lng },
          { lat: firstPoint.lat, lng: firstPoint.lng },
        ),
      );
      map.map?.fitBounds(bounds, { padding: 60 });
    });
  }

  return { mapPoints, init };
});
