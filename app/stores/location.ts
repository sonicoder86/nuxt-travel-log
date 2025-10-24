export const useLocationStore = defineStore("locationStore", () => {
  const { data: locations, status, refresh } = useFetch("/api/locations");

  const sidebarStore = useSidebarStore();

  watchEffect(() => {
    if (locations.value) {
      sidebarStore.sidebarItems = locations.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: "#",
      }));
    }

    sidebarStore.loading = status.value === "pending";
  });

  return {
    locations,
    status,
    refresh,
  };
});
