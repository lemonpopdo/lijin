<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '搜索结果',
  },
})

const keyword = ref<string>('')
const list = ref<Api.Friend[]>([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const _pageSize = 20

onLoad((option) => {
  keyword.value = option?.keyword || ''
  loadData(true)
})

async function loadData(reset = false) {
  if (!keyword.value)
    return
  if (reset) {
    page.value = 1
    list.value = []
  }
  loading.value = true
  try {
    const data = await apiSearchGet({ keyword: keyword.value })
    list.value = data.friends || []
    total.value = data.friends?.length || 0
  }
  finally {
    loading.value = false
  }
}

function onItemClick(id?: string) {
  uni.navigateTo({
    url: `/pages/friend/detail?id=${id}`,
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
        border
        @click="onItemClick(cell.id)"
      >
        <template #title>
          <div class="flex items-center">
            <div class="font-bold">
              {{ cell.name }}
            </div>
            <div v-if="cell.relation" class="ml-1 text-xs text-gray">
              @{{ cell.relation }}
            </div>
          </div>
        </template>
      </wd-cell>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
