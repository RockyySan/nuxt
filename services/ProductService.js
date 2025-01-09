import BaseService from './BaseService'

let instance = null
class ProductService extends BaseService {
  constructor() {
    super('product')
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductService()
    }
    return instance
  }

  async getProduct(payload = {}) {
    const params = {
      min_price: payload.min_price || 0,
      max_price: payload.max_price || 1000,
      categories_id: payload.categories_id || null,
      sort: payload.sort || null,
      page: payload.page || 1,
      per_page: payload.per_page || 16,
    }

    // Filter out null or undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value != null),
    )

    // Convert the filtered parameters to a query string
    const queryParams = new URLSearchParams(filteredParams).toString()

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}/all?${queryParams}`, {})
  }
  async getwishlist() {
    return await this._get(`${this._prefix}/wishlist`)
  }
  async showProduct(id) {
    return await this._get(`${this._prefix}/${id}`);
  }

  async getLatestProduct(payload = {}) {
    //per_page
    const params = {
      page: payload.page || 1,
      per_page: payload.per_page || 4,
    };

    // Convert the params object into a query string
    const queryString = new URLSearchParams(params).toString();

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}/latest?${queryString}`, {})
  }

  //discounted products
  async getDiscountedProduct(payload = {}) {
    //per_page
    const params = {
      page: payload.page || 1,
      per_page: payload.per_page || 5,
    };

    // Convert the params object into a query string
    const queryString = new URLSearchParams(params).toString();

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}/discounted?${queryString}`, {})
  }

}

export default ProductService
