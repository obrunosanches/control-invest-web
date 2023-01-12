<script setup lang='ts'>
import { provide } from 'vue';

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  striped: {
    type: Boolean,
    default: false,
  },
  stripedColumns: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
})

provide('striped', props.striped)
provide('stripedColumns', props.stripedColumns)
provide('hoverable', props.hoverable)
</script>

<template>
  <div class="relative overflow-x-auto shadow-md">
    <table :class="props.className">
      <slot></slot>
    </table>
  </div>
</template>
