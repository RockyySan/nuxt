import BaseService from './BaseService'

let instance = null
class UserService extends BaseService {
  constructor() {
    super('user')
  }

  static getInstance() {
    if (!instance) {
      instance = new UserService()
    }
    return instance
  }

  async getMe() {
    return await this._get(`${this._prefix}/me`)
  }

  async updateProfile(req) {
    return await this._post(`${this._prefix}/update-profile`, req)
  }

  async updatePassword(req) {
    return await this._post(`${this._prefix}/update-password`, req)
  }

  async disabledTwoFactorAuthentication(req) {
    return await this._post(`${this._prefix}/disable-two-factor`, req)
  }

  async confirmTwoFactorInfo(req) {
    return await this._post(`${this._prefix}/confirm-two-factor-info`, req)
  }
}

export default UserService
