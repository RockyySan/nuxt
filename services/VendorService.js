import BaseService from './BaseService'

let instance = null
class VendorService extends BaseService {
  constructor() {
    super('vendor')
  }

  static getInstance() {
    if (!instance) {
      instance = new VendorService()
    }
    return instance
  }

  async getVendor(payload = {}) {
    const queryParams = new URLSearchParams(payload).toString()
    // Make the API call with the query parameters
    return await this._get(`${this._prefix}?${queryParams}`, {})
  }


  async showVendor(payload = {}) {
    const { slug, search } = payload;  // Destructure the parameters
    const queryParams = new URLSearchParams(payload);

    if (search) {
      queryParams.append('search', search);  // Append the search term if it exists
    }

    const queryString = queryParams.toString();
    return await this._get(`${this._prefix}/${slug}?${queryString}`);
  }


}

export default VendorService
