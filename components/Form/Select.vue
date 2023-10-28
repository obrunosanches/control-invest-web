<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array,
    default: [],
    required: true
  }
})
</script>

<template>
  <FormKit
    type="select"
    :options="props.options"
    label-class="block mb-2 text-sm font-medium dark:text-gray-300"
    outer-class="w-full"
    input-class="w-full border rounded p-2.5 text-sm bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
    help-class="text-xs text-gray-500"
    v-bind="useAttrs()"
  />
</template>
