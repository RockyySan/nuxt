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
class AuthTransformer {
  static getInstance() {
    if (!instance) {
      instance = new AuthTransformer();
    }
    return instance;
  }
  fetch(res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
    if (!res) {
      return {};
    }
    const dayjs = useDayjs();
    return {
      token_type: res == null ? void 0 : res.token_type,
      access_token: res == null ? void 0 : res.access_token,
      token_expires_at: res == null ? void 0 : res.token_expires_at,
      user: {
        id: (_a = res == null ? void 0 : res.user) == null ? void 0 : _a.id,
        first_name: (_b = res == null ? void 0 : res.user) == null ? void 0 : _b.first_name,
        last_name: (_c = res == null ? void 0 : res.user) == null ? void 0 : _c.last_name,
        full_name: ((_d = res == null ? void 0 : res.user) == null ? void 0 : _d.first_name) + " " + ((_e = res == null ? void 0 : res.user) == null ? void 0 : _e.last_name),
        gender: (_f = res == null ? void 0 : res.user) == null ? void 0 : _f.gender,
        username: (_g = res == null ? void 0 : res.user) == null ? void 0 : _g.username,
        phone_number: (_h = res == null ? void 0 : res.user) == null ? void 0 : _h.phone_number,
        email: (_i = res == null ? void 0 : res.user) == null ? void 0 : _i.email,
        position: (_j = res == null ? void 0 : res.user) == null ? void 0 : _j.position,
        government_institution: (_k = res == null ? void 0 : res.user) == null ? void 0 : _k.government_institution,
        avatar: (_l = res == null ? void 0 : res.user) == null ? void 0 : _l.avatar,
        user_type: (_m = res == null ? void 0 : res.user) == null ? void 0 : _m.user_type,
        is_active: (_n = res == null ? void 0 : res.user) == null ? void 0 : _n.is_active,
        status: (_o = res == null ? void 0 : res.user) == null ? void 0 : _o.status,
        is_enable_two_factor_authentication: (_p = res == null ? void 0 : res.user) == null ? void 0 : _p.is_enable_two_factor_authentication,
        two_factor_authentication_type: (_q = res == null ? void 0 : res.user) == null ? void 0 : _q.two_factor_authentication_type,
        is_email_verified: (_r = res == null ? void 0 : res.user) == null ? void 0 : _r.is_email_verified,
        created_at: ((_s = res == null ? void 0 : res.user) == null ? void 0 : _s.created_at) ? dayjs(res.user.created_at).format("YYYY/MM/DD hh:mm A") : "",
        updated_at: ((_t = res == null ? void 0 : res.user) == null ? void 0 : _t.updated_at) ? dayjs(res.user.updated_at).format("YYYY/MM/DD hh:mm A") : ""
      }
    };
  }
  loginReq(req) {
    if (!req) {
      return {};
    }
    return {
      username: req == null ? void 0 : req.username,
      password: req == null ? void 0 : req.password
    };
  }
  registerReq(req) {
    if (!req) {
      return {};
    }
    return {
      first_name: req == null ? void 0 : req.first_name,
      last_name: req == null ? void 0 : req.last_name,
      gender: req == null ? void 0 : req.gender,
      username: req == null ? void 0 : req.username,
      phone_number: req == null ? void 0 : req.phone_number,
      email: req == null ? void 0 : req.email,
      password: req == null ? void 0 : req.password,
      password_confirmation: req == null ? void 0 : req.password_confirmation,
      user_type: req == null ? void 0 : req.user_type,
      position: req == null ? void 0 : req.position,
      government_institution: req == null ? void 0 : req.government_institution
    };
  }
  verifyOTPCodeReq(req) {
    if (!req) {
      return {};
    }
    return {
      action_type: req == null ? void 0 : req.action_type,
      provided_value: req == null ? void 0 : req.provided_value,
      verify_code: req.verify_code,
      two_factor_method: req == null ? void 0 : req.two_factor_method,
      two_factor_info: req == null ? void 0 : req.two_factor_info
    };
  }
}

export { AuthTransformer as default };
//# sourceMappingURL=AuthTransformer-jmxhrGaK.mjs.map
