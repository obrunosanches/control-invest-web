<template>
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" v-if="$attrs.for">
    <slot />
  </label>
</template>