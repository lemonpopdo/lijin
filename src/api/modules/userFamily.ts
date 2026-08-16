import { getCurrentFamilyId } from '../adapter'

export async function apiUserFamilyListGet() {
  const familyId = getCurrentFamilyId()
  if (!familyId)
    return []

  const result = await request.Get<Api.PaginationResult<Api.User>>('collections/users/records', {
    params: {
      page: 1,
      perPage: 20,
      filter: `familyId = \"${familyId}\"`,
      sort: 'created',
    },
  })
  return (result.items || []).map(user => ({
    userId: user.id,
    nickName: user.nickName,
    avatar: user.avatar,
    role: (user as Api.User & { familyRole?: string }).familyRole,
    familyId: (user as Api.User & { familyId?: string }).familyId,
    accountType: user.accountType,
  }))
}

export function apiUserFamilyGet(_data: any) {
  // TODO(阶段N): 自用双账号配置不需要单独的家庭详情接口。
  return Promise.resolve<Api.UserFamily>({})
}

export function apiUserFamilyPost(_data: any) {
  // TODO(阶段N): 仅两人自用，邀请加入在 PocketBase Admin UI 手动配置。
  uni.showToast({ icon: 'none', title: '请在管理后台配置成员' })
  return Promise.resolve('')
}

export function apiUserFamilyDelete(_data: any) {
  // TODO(阶段N): 仅两人自用，成员移除在 PocketBase Admin UI 手动配置。
  uni.showToast({ icon: 'none', title: '请在管理后台移除成员' })
  return Promise.resolve(false)
}
