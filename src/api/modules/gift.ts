import { getRecordId, toPocketBasePayload, toPocketBaseSort } from '../adapter'

export function apiGiftPageGet(data: any) {
  return request.Get<Api.PaginationResult<Api.Gift>>('collections/gifts/records', {
    params: {
      page: data.page,
      perPage: data.pageSize,
      filter: data.icon ? `icon = \"${data.icon}\"` : undefined,
      sort: toPocketBaseSort(data.field, data.order),
    },
    hitSource: [/^gift/, /^friend/],
  })
}

export function apiGiftGet(data: any) {
  return request.Get<Api.Gift>(`collections/gifts/records/${getRecordId(data)}`)
}

export async function apiGiftPut(data: any) {
  await request.Patch(`collections/gifts/records/${getRecordId(data)}`, toPocketBasePayload(data))
  return true
}

export async function apiGiftPost(data: any) {
  const record = await request.Post<Api.Gift>('collections/gifts/records', toPocketBasePayload(data))
  return record.id || ''
}

export async function apiGiftDelete(data: any) {
  await request.Delete(`collections/gifts/records/${getRecordId(data)}`)
  return true
}

export function apiGiftExportGet() {
  // TODO(阶段N): PocketBase 不提供原项目的 PDF 导出接口。
  uni.showToast({ icon: 'none', title: '暂不支持导出 PDF' })
  return Promise.resolve({ tempFilePath: '' } as unknown as UniNamespace.DownloadSuccessData)
}
