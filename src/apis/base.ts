import { formRequest, getRequest } from '@/utils/request'

export function login(data: { appId: string; code: string; decryptPhoneCode: string }) {
  return formRequest<ResponseData<ITokenInfo>>({
    url: '/oauth/login/mini/loginByAuthorizationCode',
    data
  })
}

export function getUserInfo() {
  return getRequest<ResponseData<IUserInfo>>({
    url: '/user/app/patientInfo/getCurrentLoginPatient'
  })
}

export function weeklyMustRead(data: IWeeklyMustReadParams) {
  return getRequest<PaginatedResponseData<IWeeklyMustRead>>({
    url: '/pregnant/app/weeklyMustRead/pageList',
    data
  })
}
