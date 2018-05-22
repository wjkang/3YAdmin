import request from '@/libs/request'
import qs from 'qs'

export function loginByUsername(username, password) {
    const data = {
      username,
      password
    }
    return request({
      url: '/auth/login',
      method: 'post',
      data: qs.stringify(data)
    })
  }