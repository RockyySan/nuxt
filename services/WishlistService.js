import BaseService from './BaseService'

let instance = null
class WishlistService extends BaseService {
  constructor() {
    super('wishlist')
  }

  static getInstance() {
    if (!instance) {
      instance = new WishlistService()
    }
    return instance
  }

  async getWishlist(payload = {}) {

    // Convert the filtered parameters to a query string
    const queryParams = new URLSearchParams(payload).toString()

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}/?${queryParams}`, {})
  }

  //add wishlist
  async addWishlist(id) {
    return await this._post(`${this._prefix}/${id}`, {} )
  }

  //delete wishlist
  async deleteWishlist(id) {
    return await this._delete(`${this._prefix}/${id}`, {})
  }
}

export default WishlistService
