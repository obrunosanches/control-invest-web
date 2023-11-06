<script setup lang="ts">
import classNames from "classnames"

const baseClasses = 'bg-gray-800 [&:not(:last-child)]:border-b border-white/[.15]'

const classes = computed(() => classNames(
  baseClasses, {
    [useAttrs().class]: useAttrs().class
  })
)
</script>

<template>
  <tr :class="classes" v-bind="useAttrs()">
    <slot />
  </tr>
</template>
