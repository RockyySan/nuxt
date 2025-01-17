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
      title: payload.title || '',
      min_price: payload.min_price || 0,
      max_price: payload.max_price || 5000,
      categories_id: payload.categories_id || null,
      sort: payload.sort || null,
      page: payload.page || 1,
      per_page: payload.per_page || 10,
      latest: payload.latest || false,
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

  // Service Layer - ProductService
  async getLatestProduct(payload = {}) {

    // Convert the params object into a query string
    const queryString = new URLSearchParams(payload).toString();

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}/all?${queryString}`, {});
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

  //promotion products
  async getPromotionProduct(payload = {}) {
    //per_page
    const params = {
      page: payload.page || 1,
      per_page: payload.per_page || 8,
      search: payload.search || '',
      filter: payload.filter || '',
    };

    // Convert the params object into a query string
    const queryString = new URLSearchParams(params).toString();

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}/promotion?${queryString}`, {})
  }

}

export default ProductService
