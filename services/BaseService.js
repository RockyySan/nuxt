let instance = null
export default class BaseService {
  constructor(prefix) {
    this._prefix = prefix
  }

  static getInstance() {
    if (!instance) {
      instance = new BaseService()
    }
    return instance
  }

  _get(path, params = null) {
    let payload = {}
    if (params) {
      payload = { body: params }
    }
    return useHttp(path, { method: 'GET', ...payload })
  }

  _post(path, params = null) {
    let payload = {}
    if (params) {
      payload = { body: params }
    }
    return useHttp(path, { method: 'POST', ...payload })
  }

  _put(path, params = null) {
    let payload = {}
    if (params) {
      payload = { body: params }
    }
    return useHttp(path, { method: 'PUT', ...payload })
  }

  _delete(path, params = null) {
    let req = {}
    if (params) {
      req = { body: params }
    }
    return useHttp(path, { method: 'DELETE', ...req })
  }
}
