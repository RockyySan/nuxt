import { u as useDayjs } from './composables-OxtQ7pZ5.mjs';
import './server.mjs';
import 'vue';
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

let instance = null;
class UserTransformer {
  static getInstance() {
    if (!instance) {
      instance = new UserTransformer();
    }
    return instance;
  }
  fetch(res) {
    if (!res) {
      return {};
    }
    const dayjs = useDayjs();
    return {
      id: res == null ? void 0 : res.id,
      first_name: res == null ? void 0 : res.first_name,
      last_name: res == null ? void 0 : res.last_name,
      full_name: (res == null ? void 0 : res.first_name) + " " + (res == null ? void 0 : res.last_name),
      gender: res == null ? void 0 : res.gender,
      username: res == null ? void 0 : res.username,
      phone_number: res == null ? void 0 : res.phone_number,
      email: res == null ? void 0 : res.email,
      position: res == null ? void 0 : res.position,
      government_institution: res == null ? void 0 : res.government_institution,
      avatar: res == null ? void 0 : res.avatar,
      user_type: res == null ? void 0 : res.user_type,
      is_active: res == null ? void 0 : res.is_active,
      status: res == null ? void 0 : res.status,
      is_enable_two_factor_authentication: res == null ? void 0 : res.is_enable_two_factor_authentication,
      two_factor_authentication_type: res == null ? void 0 : res.two_factor_authentication_type,
      is_email_verified: res == null ? void 0 : res.is_email_verified,
      created_at: (res == null ? void 0 : res.created_at) ? dayjs(res.created_at).format("YYYY/MM/DD hh:mm A") : "",
      updated_at: (res == null ? void 0 : res.updated_at) ? dayjs(res.updated_at).format("YYYY/MM/DD hh:mm A") : ""
    };
  }
  updateProfileReq(req) {
    if (!req) {
      return {};
    }
    return {
      last_name: req == null ? void 0 : req.last_name,
      first_name: req == null ? void 0 : req.first_name,
      gender: req == null ? void 0 : req.gender,
      government_institution: req == null ? void 0 : req.government_institution,
      avatar: req == null ? void 0 : req.avatar
    };
  }
  updatePasswordReq(req) {
    if (!req) {
      return {};
    }
    return {
      current_password: req == null ? void 0 : req.current_password,
      new_password: req == null ? void 0 : req.new_password,
      password_confirmation: req == null ? void 0 : req.password_confirmation
    };
  }
}

export { UserTransformer as default };
//# sourceMappingURL=UserTransformer-D3tPglEV.mjs.map
