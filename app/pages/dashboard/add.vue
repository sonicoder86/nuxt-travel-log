<script setup lang="ts">
import { InsertLocation } from "~/lib/db/schema";

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});
const router = useRouter();
const submitError = ref();

const onSubmit = handleSubmit(async (values) => {
  try {
    const inserted = await $fetch("/api/locations", { method: "POST", body: values });
    console.log(inserted);
  }
  catch (e) {
    const error = e as FetchError;
    submitError.value = error.statusMessage || "An unknown error occured";
  }
});

onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure?");
    if (!confirm) {
      return false;
    }
  }

  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-4">
    <div class="my-2">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
      <div role="alert" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error! Task failed successfully.</span>
      </div>
    </div>
    <form
      class="flex flex-col gap-2"
      @submit.prevent="onSubmit"
    >
      <AppFormField name="name" label="Name" type="text" :error="errors.name" />
      <AppFormField name="description" label="Description" type="textarea" :error="errors.description" />
      <AppFormField name="lat" label="Latitude" type="number" :error="errors.lat" />
      <AppFormField name="long" label="Longitude" type="number" :error="errors.long" />
      <div class="flex justify-end gap-2">
        <button type="button" class="btn" @click="router.back()">
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          Add
          <Icon name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>
