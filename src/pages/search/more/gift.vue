<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '搜索结果',
  },
})

const keyword = ref<string>('')
const list = ref<Api.Gift[]>([])
const loading = ref(false)

onLoad((option) => {
  keyword.value = option?.keyword || ''
  loadData()
})

async function loadData() {
  if (!keyword.value)
    return
  loading.value = true
  try {
    const data = await apiSearchGet({ keyword: keyword.value })
    list.value = data.gifts || []
  }
  finally {
    loading.value = false
  }
}

function onItemClick(id?: string) {
  uni.navigateTo({
    url: `/pages/gift/detail?id=${id}`,
  })
}
</script>

<template>
  <div class="mx-3 space-y-2">
    <div v-if="loading && list.length === 0" class="flex justify-center pt-10">
      <wd-loading color="#f87171" />
    </div>
    <div v-else-if="list.length === 0" class="py-16">
      <wd-empty />
    </div>
    <div v-else>
      <wd-cell
        v-for="cell in list"
        :key="cell.id"
        clickable
        center
        border
        @click="onItemClick(cell.id)"
      >
        <template #title>
          <div>
            <div class="font-bold">
              {{ cell.title }}
            </div>
            <div class="mt-0.5 text-xs text-gray">
              {{ cell.friendName }}
            </div>
          </div>
        </template>
        <template #default>
          <money-amount :money="cell.money" />
        </template>
      </wd-cell>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
