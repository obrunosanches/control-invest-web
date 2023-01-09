<script setup lang='ts'>
const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <ul :class="props.className">
    <slot />
  </ul>
</template>
