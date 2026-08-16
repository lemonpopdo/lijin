import { escapePocketBaseFilter, getRecordId, toPocketBasePayload } from '../adapter'

export async function apiFriendListGet(data: any) {
  // keyword is filtered server-side; tag is filtered client-side (tagList is a json field)
  const keyword = escapePocketBaseFilter(data?.keyword || '')
  const filter = keyword
    ? `name ~ "${keyword}" || remarks ~ "${keyword}" || relation ~ "${keyword}"`
    : undefined
  const tag = data?.tag

  const result = await request.Get<Api.PaginationResult<Api.Friend>>('collections/friends/records', {
    params: { page: 1, perPage: 500, sort: 'firstLetter,name', filter },
  })
  const items = result.items || []
  return tag ? items.filter(item => item.tagList?.includes(tag)) : items
}

export function apiFriendGet(data: any) {
  return request.Get<Api.Friend>(`collections/friends/records/${getRecordId(data)}`)
}

export async function apiFriendPut(data: any) {
  await request.Patch(`collections/friends/records/${getRecordId(data)}`, toPocketBasePayload(data))
  return true
}

export async function apiFriendPost(data: any) {
  const record = await request.Post<Api.Friend>('collections/friends/records', toPocketBasePayload(data))
  return record.id || ''
}

export async function apiFriendDelete(data: any) {
  await request.Delete(`collections/friends/records/${getRecordId(data)}`)
  return true
}

export async function apiFriendGiftListGet(data: any) {
  const friendId = escapePocketBaseFilter(getRecordId(data))
  const [bookItems, gifts] = await Promise.all([
    request.Get<Api.PaginationResult<Api.BookItem>>('collections/bookItems/records', {
      params: { page: 1, perPage: 500, filter: `friendId = "${friendId}"`, sort: '-date' },
    }),
    request.Get<Api.PaginationResult<Api.Gift>>('collections/gifts/records', {
      params: { page: 1, perPage: 500, filter: `friendId = "${friendId}"`, sort: '-date' },
    }),
  ])
  return { bookItems: bookItems.items || [], gifts: gifts.items || [] }
}
