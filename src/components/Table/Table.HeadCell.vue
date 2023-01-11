<script setup lang='ts'>
import { computed, inject } from "vue";
import classNames from "classnames";

const isColumnsStriped = inject("stripedColumns");

const baseClasses = "px-6 py-3 text-xs uppercase";
const stripedHeadCellClasses =
  "even:bg-white even:dark:bg-gray-900 odd:dark:bg-gray-800 odd:bg-gray-50";

const className = computed(() => {
  return classNames(baseClasses, {
    [stripedHeadCellClasses]: isColumnsStriped,
  });
});
</script>

<template>
  <th scope="col" :class="className">
    <slot />
  </th>
</template>
