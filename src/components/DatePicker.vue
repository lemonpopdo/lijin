<script setup lang="ts">
const props = defineProps<{
  date: string | undefined
}>()

const emit = defineEmits<{
  (e: 'update:date', value: string): void
}>()

const onDateChange = (e: any) => {
  emit('update:date', e.detail.value)
}
</script>

<template>
  <picker :value="props.date" mode="date" @change="onDateChange">
    <div class="flex items-center rounded-lg bg-[#F2F3F5] p-2">
      <div class="mr-2 text-2xl text-red font-bold">
        {{ props.date ? props.date.split('-')[2] : '--' }}
      </div>
      <div>
        <div>{{ props.date }}</div>
        <div class="text-xs text-gray">
          {{ generateLunarDate(props.date) }}
        </div>
      </div>
      <div class="ml-auto">
        <wd-icon name="right" />
      </div>
    </div>
  </picker>
</template>
