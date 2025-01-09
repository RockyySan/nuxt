import BaseService from './BaseService'

let instance = null
class RequestVendorService extends BaseService {
  constructor () {
    super('request')
  }

  static getInstance () {
    if (!instance) {
      instance = new RequestVendorService()
    }
    return instance
  }

  async request (req) {
    return await this._post(`${this._prefix}/vendor`, req)
  }
}

export default RequestVendorService
