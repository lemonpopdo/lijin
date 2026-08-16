import { getCurrentUserId } from '../adapter'

export async function apiUserNickNamePut(data: any) {
  const userId = getCurrentUserId()
  if (!userId)
    return false
  await request.Patch(`collections/users/records/${userId}`, { nickName: data.nickName })
  return true
}

export function apiUserAvatarPut(_data: any) {
  // TODO(阶段N): H5 头像上传界面尚未接入。
  uni.showToast({ icon: 'none', title: '暂不支持头像上传' })
  return Promise.resolve({ data: JSON.stringify({ succeeded: true, data: '' }) } as unknown as UniNamespace.UploadFileSuccessCallbackResult)
}

export async function apiUserDelete() {
  const userId = getCurrentUserId()
  if (!userId)
    return false
  await request.Delete(`collections/users/records/${userId}`)
  return true
}
