import BaseService from './BaseService'

let instance = null
class AuthService extends BaseService {
  constructor () {
    super('')
  }

  static getInstance () {
    if (!instance) {
      instance = new AuthService()
    }
    return instance
  }

  async login (req) {
    return await this._post(`${this._prefix}/login`, req)
  }

  async getMe () {
    return await this._get(`${this._prefix}/me`)
  }

  async register (req) {
    return await this._post(`${this._prefix}/register`, req)
  }

  async resetPassword (req) {
    return await this._post(`${this._prefix}/reset-password`, req)
  }

  async logout (req) {
    return await this._post(`${this._prefix}/logout`, req)
  }
}

export default AuthService
