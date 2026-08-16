import { adaptRecord } from '../adapter'

export async function apiAuthUserInfoGet() {
  const result = await request.Post<{ token?: string, record: Api.User }>('collections/users/auth-refresh', {})
  const authStore = useAuthStore()
  if (result.token)
    authStore.accessToken = result.token
  return adaptRecord(result.record)
}

export function apiAuthLoginEmailPost(data: any) {
  return request.Post<Api.LoginToken>('collections/users/auth-with-password', {
    identity: data.email,
    password: data.password,
  }, {
    meta: {
      authRole: 'login',
    },
  })
}

export async function apiAuthSignupEmailPost(data: any) {
  const familyId = globalThis.crypto?.randomUUID?.() || `pending-${Date.now()}-${Math.random().toString(36).slice(2)}`
  return await request.Post('collections/users/records', {
    email: data.email,
    password: data.password,
    passwordConfirm: data.password,
    nickName: data.email.split('@')[0],
    familyId,
    familyRole: '成员',
    accountType: 2,
  })
}
