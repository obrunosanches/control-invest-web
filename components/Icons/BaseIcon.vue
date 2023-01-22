<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import classNames from 'classnames';

const attrs = useAttrs()
const baseClasses = 'flex-shrink-0 w-6 h-6 transition duration-75'

const className = computed(() => {
  return classNames(baseClasses, {
    [String(attrs.class)]: useAttrs().class
  })
})
</script>

<template>
  <svg aria-hidden="true" :class="className" stroke="currentColor" stroke-width="1.5" v-bind="$attrs" fill="none"
    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <slot />
  </svg>
</template>

