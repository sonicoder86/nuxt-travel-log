<script setup lang="ts">
const mapStore = useMapStore();
const locationStore = useLocationStore();
const { locations, status } = storeToRefs(locationStore);
</script>

<template>
  <div class="flex flex-col size-full">
    <div class="p-4 min-h-64">
      <h2 class="text-2xl">
        Locations
      </h2>
      <div v-if="status === 'pending'">
        <span class="loading loading-spinner loading-xl" />
      </div>
      <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap mt-4 gap-2 overflow-auto">
        <NuxtLink
          v-for="location in locations"
          :key="location.id"
          :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
          class="card card-compact border-2 bg-base-300 mb-2 h-40 w-72 shrink-0 cursor-pointer"
          :class="{
            'border-accent': mapStore.selectedLocation?.id === location.id,
            'border-transparent': mapStore.selectedLocation?.id !== location.id,
          }"
          @mouseenter="mapStore.selectLocation(location)"
          @mouseleave="mapStore.selectLocation(null)"
        >
          <div class="card-body">
            <h2 class="text-xl">
              {{ location.name }}
            </h2>
            <p>{{ location.description }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="flex flex-col gap-2 mt-4">
        <p>Add a location to get started</p>
        <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
          Add Location
          <Icon name="tabler:circle-plus-filled" size="24" />
        </NuxtLink>
      </div>
    </div>
    <ClientOnly>
      <AppMap class="flex-1" />
    </ClientOnly>
  </div>
</template>
