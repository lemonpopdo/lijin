export function apiWxOpenLoginPost(_code: string) {
  // TODO(阶段N): 本项目当前只构建 H5，不接入微信登录。
  uni.showToast({ icon: 'none', title: '当前仅支持邮箱密码登录' })
  return Promise.resolve<Api.LoginToken>({ accessToken: '', refreshToken: '' })
}
