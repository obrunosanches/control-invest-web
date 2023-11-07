<script setup lang="ts">
import { formatDate } from "~/utils/date"
import { firstLetterUppercase } from "~/utils/string"

import type { DateSelected } from "~/types"

const optionsDefault: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }

const months = ref<string[]>([])
const dateSelected = ref<Date>(new Date())
const formatOptions = ref<Intl.DateTimeFormatOptions>(optionsDefault)
const shouldShowSelectDateByMonth = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'handleClickDateSelect', dateSelected: DateSelected)
}>()

onMounted(() => {
  [...Array(12).keys()].map(index => {
    const month = formatDate({
      date: new Date(1990, index),
      formatOptions: { month: "short" }
    })

    months.value.push(firstLetterUppercase(month).replace('.', ''))
  })
})

const yearMonthLabel = computed(() => {
  const finalDate = formatDate({
    date: dateSelected.value,
    formatOptions: formatOptions.value
  })

  return firstLetterUppercase(finalDate)
})

const toggleShowSelectByMonth = () => {
  shouldShowSelectDateByMonth.value = !shouldShowSelectDateByMonth.value
}

const setDateSelected = (date: Date = new Date(), options: Intl.DateTimeFormatOptions = optionsDefault) => {
  dateSelected.value = date
  formatOptions.value = options
}

const handleShowMonths = () => {
  if (!shouldShowSelectDateByMonth.value) {
    formatOptions.value = { year: 'numeric' }
    toggleShowSelectByMonth()
  }
}

const handleNavigateDate = (value): void => {
  if (!value) {
    setDateSelected()
    toggleShowSelectByMonth()
    return void 0
  }

  const currentDate = dateSelected.value
  let newDate: Date

  if (shouldShowSelectDateByMonth.value) {
    const newValue = value > 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear() - 1

    newDate = currentDate.setFullYear(newValue)
  } else {
    const newValue = value > 0 ? currentDate.getMonth() + 1 : currentDate.getMonth() - 1

    newDate = currentDate.setMonth(newValue)
  }

  dateSelected.value = new Date(newDate)
}

const handleSelectDate = (value) => {
  const currentDate = dateSelected.value
  const newDate = currentDate.setFullYear(currentDate.getFullYear(), value)

  setDateSelected(new Date(newDate))
}

watchEffect(() => {
  if (!shouldShowSelectDateByMonth.value) {
    emit('handleClickDateSelect', {
      month: dateSelected.value.getMonth().toString(),
      year: dateSelected.value.getFullYear().toString()
    })
  }
})
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <form-kit
      type="button"
      wrapper-class="flex"
      :ignore="false"
      @click="handleNavigateDate(-1)"
    >
      <icons-angle class="text-purple-700 hover:text-purple-500" rotate="left" />
    </form-kit>

    <form-kit
      :label="yearMonthLabel"
      type="button"
      wrapper-class="w-48"
      input-class="w-full border border-2 border-purple-700 hover:border-purple-500 text-white py-2.5 px-5 font-medium rounded-full text-sm"
      label-class="text-purple-700 hover:text-purple-500 font-bold"
      @click="handleShowMonths"
    />

    <form-kit
      v-if="shouldShowSelectDateByMonth"
      label="Hoje"
      type="button"
      input-class="border border-2 border-purple-700 hover:border-purple-500 text-white py-2.5 px-5 font-medium rounded-full text-sm"
      label-class="text-purple-700 hover:text-purple-500 font-bold"
      @click="handleNavigateDate(null)"
    />

    <form-kit
      type="button"
      wrapper-class="flex"
      :ignore="false"
      @click="handleNavigateDate(+1)"
    >
      <icons-angle class="text-purple-700 hover:text-purple-500" rotate="right" />
    </form-kit>
  </div>

  <div v-if="shouldShowSelectDateByMonth" class="flex justify-center items-center gap-1 overflow-y-auto mt-4">
    <form-kit
      v-for="index of Object.keys(months)"
      :label="months[index]"
      type="button"
      input-class="border border-2 border-purple-700 hover:border-purple-500 text-white py-2.5 px-5 font-medium rounded-full text-sm"
      label-class="text-purple-700 hover:text-purple-500 font-bold"
      @click="handleSelectDate(index)"
    />
  </div>
</template>
