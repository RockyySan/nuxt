import BaseService from './BaseService'

let instance = null
class CategoryService extends BaseService {
  constructor() {
    super('category')
  }

  static getInstance() {
    if (!instance) {
      instance = new CategoryService()
    }
    return instance
  }

  async getCategory(payload = {}) {
    //per_page
    console.log('payload : ', payload)
    const params = {
      page: payload.page || 1,
      per_page: payload.per_page || 6,
    };

    // Convert the params object into a query string
    const queryString = new URLSearchParams(params).toString();

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}?${queryString}`, {});
  }

  //showCategory
  async showCategory(slug, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this._get(`${this._prefix}/${slug}?${queryString}`, {});
  }

}

export default CategoryService
