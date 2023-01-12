<script setup lang='ts'>
const props = defineProps({
  className: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <thead :class="props.className">
    <tr>
      <slot></slot>
    </tr>
  </thead>
</template>
