<script setup lang="ts">
import classNames from 'classnames'

const attrs = useAttrs()
const baseClasses = 'flex-shrink-0 w-[24px] h-[24px] transition duration-75'

const className = computed(() => {
  return classNames(baseClasses, {
    [String(attrs.class)]: useAttrs().class
  })
})
</script>

<template>
  <svg
    :class="className"
    v-bind="$attrs"
    aria-hidden="true"
    stroke="currentColor"
    stroke-width="1.5"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>

