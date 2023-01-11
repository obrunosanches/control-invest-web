<script setup lang='ts'>
import { computed, inject } from 'vue';
import classNames from 'classnames';

const isColumnsStriped = inject('stripedColumns')

const baseClasses = 'px-6 py-4 first:font-medium first:text-white first:whitespace-nowrap last:text-right'
const stripedCellClasses = 'even:bg-gray-900 odd:bg-gray-800'

const className = computed(() => {
  return classNames(baseClasses, {
    [stripedCellClasses]: isColumnsStriped,
  })
})
</script>

<template>
  <td :class="className">
    <slot></slot>
  </td>
</template>
