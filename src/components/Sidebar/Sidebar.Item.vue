<script setup lang='ts'>
const props = defineProps({
  href: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <li>
    <a :href="props.href" class="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
      <slot />
    </a>
  </li>
</template>
