<script setup lang='ts'>
const props = defineProps({
  hasTitle: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="p-6" :class="props.hasTitle ? '' : 'pt-0'">
    <slot />
  </div>
</template>
