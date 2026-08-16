import { escapePocketBaseFilter } from '../adapter'

export async function apiSearchGet(data: { keyword?: string }) {
  const keyword = escapePocketBaseFilter(data?.keyword || '')
  if (!keyword)
    return { books: [], bookItems: [], gifts: [], friends: [] }

  const friendFilter = `name ~ "${keyword}" || remarks ~ "${keyword}" || relation ~ "${keyword}"`
  const giftFilter = `friendName ~ "${keyword}" || title ~ "${keyword}" || remarks ~ "${keyword}"`
  const bookItemFilter = `friendName ~ "${keyword}" || title ~ "${keyword}" || remarks ~ "${keyword}"`
  const bookFilter = `title ~ "${keyword}" || remarks ~ "${keyword}"`

  const [friendsResult, giftsResult, bookItemsResult, booksResult] = await Promise.all([
    request.Get<Api.PaginationResult<Api.Friend>>('collections/friends/records', {
      params: { page: 1, perPage: 20, filter: friendFilter, sort: 'firstLetter,name' },
    }),
    request.Get<Api.PaginationResult<Api.Gift>>('collections/gifts/records', {
      params: { page: 1, perPage: 20, filter: giftFilter, sort: '-date' },
    }),
    request.Get<Api.PaginationResult<Api.BookItem>>('collections/bookItems/records', {
      params: { page: 1, perPage: 20, filter: bookItemFilter, sort: '-date' },
    }),
    request.Get<Api.PaginationResult<Api.Book>>('collections/books/records', {
      params: { page: 1, perPage: 20, filter: bookFilter, sort: '-date' },
    }),
  ])

  return {
    friends: friendsResult.items || [],
    gifts: giftsResult.items || [],
    bookItems: bookItemsResult.items || [],
    books: booksResult.items || [],
  }
}
