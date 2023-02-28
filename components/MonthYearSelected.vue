<template>
  <div>
    <div class="flex items-center justify-center">
      <the-button class="py-1 px-2" @click="setDateSelected({ value: -1 })">
        <icons-arrow-left/>
      </the-button>

      <div @click="toggleMonths">
        {{ monthYearSelected }}
      </div>

      <the-button class="py-1 px-2" @click="setDateSelected({ value: +1 })">
        <icons-arrow-rigth/>
      </the-button>
    </div>

    <div v-if="showMonths" class="flex justify-center items-center gap-1 overflow-y-auto">
      <the-button
          v-for="monthIndex of Object.keys(months)"
          class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-3 py-1.5 focus:ring-blue-800"
          @click="setDateSelected({ action: 'set', value: Number(monthIndex) })"
      >
        {{ months[monthIndex] }}
      </the-button>
    </div>

  </div>
</template>

<script setup lang="ts">
const optionsDefault: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
const formatOptions = ref<Intl.DateTimeFormatOptions>(optionsDefault)
const dateSelected = ref<Date>(new Date())
const months = ref<string[]>([])
const showMonths = ref<boolean>(false)

interface DateSelected {
  action?: 'increment' | 'set'
  value: number
}

onMounted(() => {
    [...Array(12).keys()].forEach(monthIndex => {
    const month = formatDate({
      date: new Date(1990, monthIndex),
      formatOptions: {month: "short"}
    })

    months.value.push(
      month
        .replace('.', '')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
    )
  })
})

const emit = defineEmits(['dateSelected'])

const incrementDate = (value: number) => {
  const currentDate = dateSelected.value
  let newDate: any

  if (!showMonths.value) {
    const newValue = value > 0 ? currentDate.getMonth() + 1 : currentDate.getMonth() - 1

    newDate = currentDate.setMonth(newValue)
  } else {
    const newValue = value > 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear() - 1

    newDate = currentDate.setFullYear(newValue)
  }

  return newDate
}

const setDateSelected = ({ action = 'increment', value }: DateSelected) => {
  const currentDate = dateSelected.value
  let newDate: any

  switch (action) {
    case "increment":
      newDate = incrementDate(value)
      break
    case "set":
      newDate = currentDate.setFullYear(currentDate.getFullYear(), value)
      toggleMonths()
      break
  }

  dateSelected.value = new Date(newDate)

  emit('dateSelected', {
    date: dateSelected.value,
    month: String(dateSelected.value.getMonth() + 1),
    year: dateSelected.value.getFullYear().toString()
  })
}

const toggleMonths = () => {
  formatOptions.value = showMonths.value ? optionsDefault : { year: 'numeric' }
  showMonths.value = !showMonths.value
}

const monthYearSelected = computed(() => {
  return formatDate({
    date: dateSelected.value,
    formatOptions: formatOptions.value
  })
})
</script>