import { escapePocketBaseFilter, getRecordId, toPocketBasePayload, toPocketBaseSort } from '../adapter'

export function apiBookItemPageGet(data: any) {
  const filters = []
  if (data.bookId)
    filters.push(`bookId = \"${escapePocketBaseFilter(data.bookId)}\"`)
  if (data.keyword)
    filters.push(`(friendName ~ \"${escapePocketBaseFilter(data.keyword)}\" || title ~ \"${escapePocketBaseFilter(data.keyword)}\")`)

  return request.Get<Api.PaginationResult<Api.BookItem>>('collections/bookItems/records', {
    params: {
      page: data.page,
      perPage: data.pageSize,
      filter: filters.join(' && ') || undefined,
      sort: toPocketBaseSort(data.field, data.order),
    },
    hitSource: [/^book-item/, /^friend/],
  })
}

export function apiBookItemGet(data: any) {
  return request.Get<Api.BookItem>(`collections/bookItems/records/${getRecordId(data)}`)
}

export async function apiBookItemPut(data: any) {
  await request.Patch(`collections/bookItems/records/${getRecordId(data)}`, toPocketBasePayload(data))
  return true
}

export async function apiBookItemPost(data: any) {
  const record = await request.Post<Api.BookItem>('collections/bookItems/records', toPocketBasePayload(data))
  return record.id || ''
}

export async function apiBookItemDelete(data: any) {
  await request.Delete(`collections/bookItems/records/${getRecordId(data)}`)
  return true
}

export async function apiBookItemBatchPost(data: Api.BookItem[]) {
  const ids = await Promise.all(data.map(async (item) => {
    const record = await request.Post<Api.BookItem>('collections/bookItems/records', toPocketBasePayload(item))
    return record.id || ''
  }))
  return ids
}
