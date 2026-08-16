const permanentPlan: Api.SubscriptionPlan = {
  productId: 'self-hosted',
  title: '永久会员',
  price: 0,
  desc: '自托管版本默认拥有全部功能。',
}

const permanentUser: Api.User = {
  id: 'self-hosted',
  accountType: 2,
}

export function apiSubscriptionPlanGet(_data: any) {
  return Promise.resolve(permanentPlan)
}

export function apiSubscriptionCreateJsapiPayPost(_data: any) {
  uni.showToast({ icon: 'none', title: '自托管版本无需支付' })
  return Promise.resolve<Api.WechatPayTransactionOutput<Api.WechatPayTransactionJsapiSingInfo>>({
    outTradeNumber: '',
    singInfo: {} as Api.WechatPayTransactionJsapiSingInfo,
  })
}

export function apiSubscriptionCreateH5PayPost(_data: any) {
  uni.showToast({ icon: 'none', title: '自托管版本无需支付' })
  return Promise.resolve<Api.WechatPayTransactionOutput<Api.WechartPayTransactionH5SingInfo>>({
    outTradeNumber: '',
    singInfo: { h5Url: '' },
  })
}

export function apiSubscriptionCreateXPayPost(_data: any) {
  uni.showToast({ icon: 'none', title: '自托管版本无需支付' })
  return Promise.resolve<Api.WechatPayTransactionOutput<Api.XPayGoodsTransactionOutput>>({
    outTradeNumber: '',
    singInfo: {} as Api.XPayGoodsTransactionOutput,
  })
}

export function apiSubscriptionRedeemCouponPost(_data: any) {
  return Promise.resolve(useAuthStore().userInfo || permanentUser)
}

export function apiSubscriptionSyncMemberStatusFromPaymentGatewayPost(_data: any) {
  return Promise.resolve(useAuthStore().userInfo || permanentUser)
}
