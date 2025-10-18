<script lang="ts" setup>
const props = defineProps<{
  label: string;
  name: string;
  error?: string;
  type?: "text" | "textarea" | "number";
  disabled?: boolean;
}>();
const asElement = computed(() => {
  if (props.type === "number" || props.type === "text") {
    return "input";
  }

  return props.type;
});
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="asElement"
      :name="props.name"
      :type="type || 'text'"
      :disabled="disabled"
      class="w-full"
      :class="{
        'input-error': props.error,
        'input': type === 'text' || type === 'number',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
