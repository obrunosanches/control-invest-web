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
const inputBaseClasses = 'rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
const inputClasses = computed(() => {
  return classNames(
    inputBaseClasses, {
    [String(useAttrs().class)]: useAttrs().class
  })
})
</script>

<template>
  <Label :for="idElement" :v-if="props.label">
    {{ props.label }}
  </Label>

  <input :id="idElement" :class="inputClasses" autocomplete="off" v-bind="$attrs">
</template>