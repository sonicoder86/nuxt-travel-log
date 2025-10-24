export const useLocationStore = defineStore("locationStore", () => {
  const { data, status, refresh } = useFetch("/api/locations");

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  watchEffect(() => {
    if (data.value) {
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: "#",
      }));
      mapStore.mapPoints = data.value.map(location => ({
        id: location.id,
        label: location.name,
        lat: location.lat,
        lng: location.long,
      }));
    }

    sidebarStore.loading = status.value === "pending";
  });

  return {
    locations: data,
    status,
    refresh,
  };
});
