<script setup lang="ts">
import type { FetchError } from "ofetch";

import type { NominatimResult } from "~/lib/types";

import { MAP_CENTER } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: "",
    description: "",
    lat: MAP_CENTER.lat,
    long: MAP_CENTER.lon,
  },
});
const router = useRouter();
const submitError = ref();
const loading = ref(false);
const submitted = ref(false);

const locationStore = useLocationStore();
const mapStore = useMapStore();
const { $csrfFetch } = useNuxtApp();

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", { method: "POST", body: values });
    submitted.value = true;
    locationStore.refresh();
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }

    submitError.value = error.statusMessage || "An unknown error occured";
  }
  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure?");
    if (!confirm) {
      return false;
    }
  }

  mapStore.selectedPoint = null;
  return true;
});

function formatNumber(value?: number) {
  if (!value)
    return 0;

  return value.toFixed(5);
}

function searchResultSelected(result: NominatimResult) {
  setFieldValue("name", result.display_name);
  mapStore.selectedPoint = {
    lon: Number(result.lon),
    lat: Number(result.lat),
  };
}

effect(() => {
  if (mapStore.selectedPoint) {
    setFieldValue("lat", mapStore.selectedPoint.lat);
    setFieldValue("long", mapStore.selectedPoint.lon);
  }
});

onMounted(() => {
  mapStore.selectedPoint = { ...MAP_CENTER };
});
</script>

<template>
  <div class="flex size-full">
    <div class="container max-w-md mx-auto mt-4 p-4">
      <div class="my-2">
        <h1 class="text-lg">
          Add Location
        </h1>
        <p class="text-sm">
          A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
        </p>
        <div v-if="submitError" role="alert" class="alert alert-error">
          <span>{{ submitError }}</span>
        </div>
      </div>
      <form
        class="flex flex-col gap-2"
        @submit.prevent="onSubmit"
      >
        <AppFormField
          name="name"
          label="Name"
          type="text"
          :error="errors.name"
          :disabled="loading"
        />
        <AppFormField name="description" label="Description" type="textarea" :error="errors.description" :disabled="loading" />
        <p class="text-xs text-gray-400">
          Current location: {{ formatNumber(controlledValues.lat) }}, {{ formatNumber(controlledValues.long) }}
        </p>
        <p>To set the coordinates:</p>
        <ul class="list-disc ml-4 text-sm">
          <li>
            Drag the <Icon name="tabler:map-pin-filled" class="text-warning" /> marker on the map.
          </li>
          <li>
            Double click the map.
          </li>
          <li>
            Search for a location below.
          </li>
        </ul>

        <div class="flex justify-end gap-2">
          <button :disabled="loading" type="button" class="btn" @click="router.back()">
            <Icon name="tabler:arrow-left" size="24" />
            Cancel
          </button>
          <button :disabled="loading" type="submit" class="btn btn-primary">
            Add
            <span v-if="loading" class="loading loading-spinner loading-sm" />
            <Icon v-else name="tabler:circle-plus-filled" size="24" />
          </button>
        </div>
      </form>
      <div class="divider" />
      <AppPlaceSearch @result-selected="searchResultSelected" />
    </div>
    <ClientOnly>
      <AppMap class="flex-1" />
    </ClientOnly>
  </div>
</template>
