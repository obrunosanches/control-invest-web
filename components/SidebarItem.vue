<script setup lang="ts">
const props = defineProps({
  route: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li>
    <router-link
      :to="props.route"
      class="flex items-center p-3 rounded-lg text-gray-500 hover:bg-slate-100"
    >
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </router-link>
  </li>
</template>
