export function apiEmailSendVerifyEmailPost(_data: any) {
  // TODO(阶段N): PocketBase 邮箱验证流程尚未接入。
  uni.showToast({ icon: 'none', title: '暂不支持邮箱验证码' })
  return Promise.resolve(true) as any
}

export function apiEmailVerifyEmailPost(_data: any) {
  // TODO(阶段N): PocketBase 邮箱验证流程尚未接入。
  uni.showToast({ icon: 'none', title: '暂不支持邮箱验证' })
  return Promise.resolve(true) as any
}
