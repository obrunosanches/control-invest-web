<template>
  <button :class="String(useAttrs().class)">
    <slot />
  </button>
</template>
