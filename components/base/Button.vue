<template>
  <button tag="button" :class="wrapperClasses" :disabled="disabled">
    <div v-if="!isOutlineGradient && ($slots.prefix || loadingPrefix)" class="mr-2">
      <slot name="prefix" />
    </div>

    <span :class="spanClasses">
      <div v-if="isOutlineGradient && ($slots.prefix || loadingPrefix)" class="mr-2">
        <slot name="prefix" />
      </div>

      <slot/>

      <div v-if="isOutlineGradient && ($slots.suffix || loadingSuffix)" class="ml-2">
        <slot name="suffix" />
      </div>
    </span>

    <div v-if="!isOutlineGradient && ($slots.suffix || loadingSuffix)" class="ml-2">
      <slot name="suffix" />
    </div>
  </button>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {ButtonGradient, ButtonMonochromeGradient, ButtonSize, ButtonVariant} from "~/components/base/types/types";
import {useButtonClasses} from "~/components/base/composables/useButtonClasses";

const props = defineProps({
  color: {
    type: String as PropType<ButtonVariant>,
    default: 'default',
  },
  gradient: {
    type: [String, null] as PropType<ButtonGradient | null>,
    default: null,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md',
  },
  shadow: {
    type: [String, null] as PropType<ButtonMonochromeGradient | '' | null>,
    default: null,
  },
  pill: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingPosition: {
    type: String as PropType<'suffix' | 'prefix'>,
    default: 'prefix',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const isOutlineGradient = computed(() => props.outline && props.gradient)
const loadingPrefix = computed(() => props.loading && props.loadingPosition === 'prefix')
const loadingSuffix = computed(() => props.loading && props.loadingPosition === 'suffix')

const { wrapperClasses, spanClasses } = useButtonClasses(toRefs(props))
</script>

<style scoped lang="scss">

</style>