import { getRecordId, toPocketBasePayload, toPocketBaseSort } from '../adapter'

export function apiBookPageGet(data: Api.PaginationQuery) {
  return request.Get<Api.PaginationResult<Api.Book>>('collections/books/records', {
    params: {
      page: data.page,
      perPage: data.pageSize,
      sort: toPocketBaseSort(data.field, data.order),
    },
    hitSource: [/^book/, /^book-item/],
  })
}

export async function apiBookGet(data: any) {
  const book = await request.Get<Api.Book>(`collections/books/records/${getRecordId(data)}`)
  const items = await request.Get<Api.PaginationResult<Api.BookItem>>('collections/bookItems/records', {
    params: { page: 1, perPage: 500, filter: `bookId = \"${getRecordId(data)}\"` },
  })
  const bookItems = items.items || []
  return {
    ...book,
    count: bookItems.length,
    attendanceTotal: bookItems.reduce((total, item) => total + Number(item.attendance || 0), 0),
    moneyTotal: bookItems.reduce((total, item) => total + Number(item.money || 0), 0),
  }
}

export async function apiBookPut(data: any) {
  await request.Patch(`collections/books/records/${getRecordId(data)}`, toPocketBasePayload(data))
  return true
}

export async function apiBookPost(data: any) {
  const record = await request.Post<Api.Book>('collections/books/records', toPocketBasePayload(data))
  return record.id || ''
}

export async function apiBookDelete(data: any) {
  await request.Delete(`collections/books/records/${getRecordId(data)}`)
  return true
}

export function apiBookExportGet(_data: any) {
  // TODO(阶段N): PocketBase 不提供原项目的 PDF 导出接口。
  uni.showToast({ icon: 'none', title: '暂不支持导出 PDF' })
  return Promise.resolve({ tempFilePath: '' } as unknown as UniNamespace.DownloadSuccessData)
}
