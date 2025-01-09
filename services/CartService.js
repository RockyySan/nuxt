import BaseService from './BaseService'

let instance = null
class CartService extends BaseService {
  constructor() {
    super('cart')
  }

  static getInstance() {
    if (!instance) {
      instance = new CartService()
    }
    return instance
  }

  async getCart(params = {}) {
    // Transform query parameters to a query string
    const queryParams = new URLSearchParams(params).toString();

    // Append query string to the endpoint if params exist
    const url = queryParams ? `${this._prefix}?${queryParams}` : this._prefix;

    // Make the API call and return the result
    return await this._get(url);
  }

  async addCart(params = {}) {
    return await this._post(`${this._prefix}/add`, params);
  }

  async buyCart(data) {
    return await this._post(`${this._prefix}/buy`, data)
  }

  async deleteCart(id) {
    return await this._delete(`${this._prefix}/${id}`)
  }

  async createCategory(data = {}) {
    // Create a new category
    console.log(data);
    return await this._post(`${this._prefix}`, data);
  }


}

export default CartService
