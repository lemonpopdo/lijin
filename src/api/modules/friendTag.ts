import { getRecordId, toPocketBasePayload } from '../adapter'

export async function apiFriendTagListGet() {
  const result = await request.Get<Api.PaginationResult<Api.FriendTag>>('collections/friendTags/records', {
    params: { page: 1, perPage: 200, sort: 'name' },
  })
  return result.items || []
}

export async function apiFriendTagPut(data: any) {
  await request.Patch(`collections/friendTags/records/${getRecordId(data)}`, toPocketBasePayload(data))
  return true
}

export async function apiFriendTagPost(data: any) {
  const record = await request.Post<Api.FriendTag>('collections/friendTags/records', toPocketBasePayload(data))
  return record.id || ''
}

export async function apiFriendTagDelete(data: any) {
  await request.Delete(`collections/friendTags/records/${getRecordId(data)}`)
  return true
}
