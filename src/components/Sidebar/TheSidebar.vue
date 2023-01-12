<script setup lang='ts'>
const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <aside :class="props.className" :aria-label="props.label">
    <div class="px-3 py-4 overflow-y-auto">
      <slot></slot>
    </div>
  </aside>
</template>
