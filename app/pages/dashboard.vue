<script setup lang="ts">
import { useSidebarStore } from "~/stores/sidebar";

const isSidebarOpenCookie = useCookie<boolean>("is-sidebar-open");
const isSidebarOpen = ref(isSidebarOpenCookie.value || false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  isSidebarOpenCookie.value = isSidebarOpen.value;
}
const sidebarStore = useSidebarStore();
const locationStore = useLocationStore();

onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        class="flex cursor-pointer hover:bg-base-300 p-2"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="32"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="32"
        />
      </div>

      <div class="flex flex-col">
        <SidebarButton
          href="/dashboard"
          label="Locations"
          icon="tabler:map"
          :show-label="isSidebarOpen"
        />
        <SidebarButton
          href="/dashboard/add"
          label="Add location"
          icon="tabler:circle-plus-filled"
          :show-label="isSidebarOpen"
        />
        <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-4 w-full" />
        </div>
        <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
          <SidebarButton
            v-for="sidebarItem in sidebarStore.sidebarItems"
            :key="sidebarItem.id"
            :label="sidebarItem.label"
            :icon="sidebarItem.icon"
            :href="sidebarItem.href"
            :show-label="isSidebarOpen"
          />
        </div>
        <div class="divider" />
        <SidebarButton
          href="/sign-out"
          label="Sign out"
          icon="tabler:logout-2"
          :show-label="isSidebarOpen"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
