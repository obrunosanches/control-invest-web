<script setup lang="ts">
import classNames from "classnames"

const baseClasses = 'bg-white [&:not(:last-child)]:border-b border-black/10'

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
