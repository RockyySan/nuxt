import BaseService from './BaseService'

let instance = null
class OrderService extends BaseService {
  constructor() {
    super('orders')
  }

  static getInstance() {
    if (!instance) {
      instance = new OrderService()
    }
    return instance
  }

  async getOrder(payload = {}) {

    const queryString = new URLSearchParams(payload).toString();

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}?${queryString}`, {});
  }


}

export default OrderService
