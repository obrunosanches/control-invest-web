<script setup lang='ts'>
import { computed, inject } from 'vue';
import classNames from 'classnames';

const isStriped = inject('striped')
const isHoverable = inject('hoverable')

const baseClasses = 'bg-gray-800 [&:not(:last-child)]:border-gray-700 hover:bg-gray-600'
const stripedClasses = 'odd:bg-gray-800 even:bg-gray-700'
const hoverableClasses = 'hover:bg-gray-600'

const className = computed(() => {
  return classNames(baseClasses, {
    [stripedClasses]: isStriped,
    [hoverableClasses]: isHoverable,
  })
})
</script>

<template>
  <tr :class="className">
    <slot></slot>
  </tr>
</template>
