type PocketBaseRecord = Record<string, any>

interface PocketBasePagination<T> {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: T[]
}

const transientFields = new Set([
  'id',
  'created',
  'updated',
  'createTime',
  'updateTime',
  'collectionId',
  'collectionName',
  'expand',
  'count',
  'attendanceTotal',
  'moneyTotal',
])

export function adaptRecord<T extends PocketBaseRecord>(record: T): T {
  if (!record || typeof record !== 'object')
    return record

  const mapped: PocketBaseRecord = { ...record }
  if (record.created)
    mapped.createTime = record.created
  if (record.updated)
    mapped.updateTime = record.updated
  return mapped as T
}

export function adaptPagination<T extends PocketBaseRecord>(result: PocketBasePagination<T>): Api.PaginationResult<T> {
  return {
    page: result.page,
    pageSize: result.perPage,
    total: result.totalItems,
    totalPages: result.totalPages,
    hasPrevPage: result.page > 1,
    hasNextPage: result.page < result.totalPages,
    items: result.items.map(item => adaptRecord(item)),
  }
}

export function adaptPocketBaseResponse(data: unknown) {
  if (!data || typeof data !== 'object')
    return data

  const value = data as PocketBaseRecord
  if (Array.isArray(value.items) && typeof value.page === 'number' && typeof value.perPage === 'number')
    return adaptPagination(value as PocketBasePagination<PocketBaseRecord>)

  if (value.id && (value.created || value.updated))
    return adaptRecord(value)

  return value
}

export function toPocketBasePayload(data: PocketBaseRecord, includeFamilyId = true): PocketBaseRecord {
  const payload = Object.fromEntries(
    Object.entries(data || {}).filter(([key, value]) => !transientFields.has(key) && value !== undefined),
  )

  if (includeFamilyId && !payload.familyId) {
    const familyId = getCurrentFamilyId()
    if (familyId)
      payload.familyId = familyId
  }

  return payload
}

export function getCurrentUserId() {
  return useAuthStore().userInfo?.id
}

export function getCurrentFamilyId() {
  return (useAuthStore().userInfo as (Api.User & { familyId?: string }) | undefined)?.familyId
}

export function getRecordId(data: PocketBaseRecord) {
  return data?.id
}

export function escapePocketBaseFilter(value: unknown) {
  return String(value ?? '').replaceAll('\\', '\\\\').replaceAll('"', '\\"')
}

export function toPocketBaseSort(field?: string, order?: 'asc' | 'desc') {
  if (!field)
    return undefined
  return order === 'desc' ? `-${field}` : field
}
