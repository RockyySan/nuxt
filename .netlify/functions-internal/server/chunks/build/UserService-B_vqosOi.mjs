import BaseService from './BaseService-DD57qP2C.mjs';
import 'vue';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'vue-i18n';
import 'vue/server-renderer';
import './cookie-DaDFWqWH.mjs';
import 'sweetalert2';

let instance = null;
class UserService extends BaseService {
  constructor() {
    super("user");
  }
  static getInstance() {
    if (!instance) {
      instance = new UserService();
    }
    return instance;
  }
  async getMe() {
    return await this._get(`${this._prefix}/me`);
  }
  async updateProfile(req) {
    return await this._post(`${this._prefix}/update-profile`, req);
  }
  async updatePassword(req) {
    return await this._post(`${this._prefix}/update-password`, req);
  }
  async disabledTwoFactorAuthentication(req) {
    return await this._post(`${this._prefix}/disable-two-factor`, req);
  }
  async confirmTwoFactorInfo(req) {
    return await this._post(`${this._prefix}/confirm-two-factor-info`, req);
  }
}

export { UserService as default };
//# sourceMappingURL=UserService-B_vqosOi.mjs.map
