import { e as defineNuxtRouteMiddleware, a as navigateTo } from './server.mjs';
import { u as useCookie } from './cookie-DaDFWqWH.mjs';
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

const redirectIfAuthenticated = defineNuxtRouteMiddleware(() => {
  const { value: token } = useCookie("token");
  if (token) {
    return navigateTo("/dashboard");
  }
});

export { redirectIfAuthenticated as default };
//# sourceMappingURL=redirectIfAuthenticated-CftVgjT9.mjs.map
