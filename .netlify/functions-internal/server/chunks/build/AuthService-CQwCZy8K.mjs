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
class AuthService extends BaseService {
  constructor() {
    super("auth");
  }
  static getInstance() {
    if (!instance) {
      instance = new AuthService();
    }
    return instance;
  }
  async login(req) {
    return await this._post(`${this._prefix}/login`, req);
  }
  async register(req) {
    return await this._post(`${this._prefix}/register`, req);
  }
  async sendOTPCode(req) {
    return await this._post(`${this._prefix}/send-otp-code`, req);
  }
  async verifyOTPCode(req) {
    return await this._post(`${this._prefix}/verify-otp-code`, req);
  }
  async resetPassword(req) {
    return await this._post(`${this._prefix}/reset-password`, req);
  }
  async logout(req) {
    return await this._post(`${this._prefix}/logout`, req);
  }
}

export { AuthService as default };
//# sourceMappingURL=AuthService-CQwCZy8K.mjs.map
