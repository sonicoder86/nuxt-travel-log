export const useLocationStore = defineStore("locationStore", () => {
  const { data: locations, status, refresh } = useFetch("/api/locations");

  return {
    locations,
    status,
    refresh,
  };
});
