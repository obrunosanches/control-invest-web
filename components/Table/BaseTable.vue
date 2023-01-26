<script setup lang='ts'>
import { provide } from 'vue';

const props = defineProps({
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
  <table v-bind="$attrs">
    <slot></slot>
  </table>
</template>
