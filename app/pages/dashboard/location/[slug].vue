<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;
const { data: location, status, error } = await useFetch(`/api/locations/${slug}`);
</script>

<template>
  <div class="flex size-full" :class="{ 'flex-col': route.path !== '/dashboard/add' }">
    <div class="min-h-64 p-4">
      <div v-if="status === 'pending'">
        <div class="loading" />
      </div>
      <div v-if="error && status !== 'pending'" class="alert alert-error">
        <h2 class="text-lg">
          {{ error.message }}
        </h2>
      </div>
      <div v-if="location && status !== 'pending'">
        <h2 class="text-xl">
          {{ location.name }}
        </h2>
        <p class="text-sm">
          {{ location.description }}
        </p>
      </div>
    </div>
    <ClientOnly>
      <AppMap class="flex-1" />
    </ClientOnly>
  </div>
</template>
