<script setup lang="ts">
import classNames from "classnames"

const props = defineProps({
  label: {
    type: String
  }
})

const idElement = String(useAttrs().name) ?? ''
const baseClasses = 'border rounded w-full p-2.5 text-sm bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
const classes = computed(() => {
  return classNames(
    baseClasses, {
      [String(useAttrs().class)]: useAttrs().class
    })
})
</script>

<template>
  <form-label :for="idElement">
    {{ props.label }}
  </form-label>

  <input :id="idElement" :class="classes" autocomplete="off" v-bind="$attrs" />
</template>
