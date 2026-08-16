import type { uniappRequestAdapter } from '@alova/adapter-uniapp'
import type VueHook from 'alova/vue'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import { adaptPocketBaseResponse } from './adapter'

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<typeof VueHook, typeof uniappRequestAdapter>({
  refreshTokenOnSuccess: {
    isExpired: response => response.statusCode === 401,
    handler: async () => {
      // #ifdef MP-WEIXIN
      try {
        const { code } = await uni.login()
        await apiWxOpenLoginPost(code)
      }
      catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        uni.reLaunch({ url: `/pages/exception/500?error=${encodeURIComponent(errorMessage)}` })
        throw error
      }
      // #endif

      // #ifdef H5
      uni.reLaunch({ url: '/pages/login/index' })
      throw new Error('登录失效，请重新登录')
      // #endif
    },
  },
  assignToken(method) {
    const { accessToken } = useAuthStore()
    if (accessToken) {
      method.config.headers = {
        ...method.config.headers,
        Authorization: accessToken,
      }
    }
  },
  login(response) {
    const { data } = response as UniNamespace.RequestSuccessCallbackResult
    const { token, record } = data as { token?: string, record?: Api.User }
    const authStore = useAuthStore()
    authStore.accessToken = token
    authStore.refreshToken = undefined
    if (record)
      authStore.userInfo = record
  },
})

const request = createAlova({
  baseURL: `${import.meta.env.VITE_SERVICE_URL}/api`,
  ...AdapterUniapp(),
  beforeRequest: onAuthRequired(() => {}),
  responded: onResponseRefreshToken((response, method) => {
    const { requestType } = method.config
    if (requestType === 'download' || requestType === 'upload')
      return response

    const { statusCode, data, errMsg } = response as UniNamespace.RequestSuccessCallbackResult
    if (statusCode < 200 || statusCode >= 300) {
      const message = (data as { message?: string })?.message || `HTTP 请求错误[${statusCode}]`
      uni.showToast({ icon: 'none', title: message })
      throw new Error(`${message}: ${errMsg}`)
    }

    return adaptPocketBaseResponse(data)
  }),
})

export default request
