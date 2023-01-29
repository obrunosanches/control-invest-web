<script setup lang="ts">
import { useAttrs } from 'vue';
import classNames from 'classnames';

import Label from './FormLabel.vue';

const props = defineProps({
  label: {
    type: String
  }
})

const idElement = String(useAttrs().name) ?? ''
const selectBaseClasses = 'border rounded-lg w-full p-2.5 text-sm dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
const inputClasses = computed(() => {
  return classNames(
    selectBaseClasses, {
    [String(useAttrs().class)]: useAttrs().class
  })
})
</script>

<template>
  <Label :for="idElement" :v-if="props.label">
    {{ props.label }}
  </Label>

  <select :id="idElement" :class="inputClasses" v-bind="$attrs">
    <slot />
  </select>
</template>
