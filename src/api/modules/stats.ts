import { escapePocketBaseFilter } from '../adapter'

export async function apiStatsDashboardGet(params?: { startDate?: string, endDate?: string }) {
  const filters: string[] = []
  if (params?.startDate)
    filters.push(`date >= "${escapePocketBaseFilter(params.startDate)}"`)
  if (params?.endDate)
    filters.push(`date <= "${escapePocketBaseFilter(params.endDate)}"`)
  const filter = filters.join(' && ') || undefined

  const [bookItemsResult, giftsResult] = await Promise.all([
    request.Get<Api.PaginationResult<Api.BookItem>>('collections/bookItems/records', {
      params: { page: 1, perPage: 500, filter, sort: '-date' },
    }),
    request.Get<Api.PaginationResult<Api.Gift>>('collections/gifts/records', {
      params: { page: 1, perPage: 500, filter, sort: '-date' },
    }),
  ])

  return {
    bookItems: bookItemsResult.items || [],
    gifts: giftsResult.items || [],
  }
}
