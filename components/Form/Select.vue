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
  <form-kit
    type="select"
    :options="props.options"
    label-class="block mb-2 text-sm font-medium"
    outer-class="w-full"
    input-class="w-full rounded p-2.5 text-sm bg-white border border-black/30"
    v-bind="useAttrs()"
  />
</template>
