import { ssrRenderAttrs } from 'vue/server-renderer';
import { useI18n } from 'vue-i18n';
import { useSSRContext } from 'vue';
import { u as useSeoMeta } from './index--DdJWkO-.mjs';
import '@unhead/shared';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'unhead';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useSeoMeta({
      titleTemplate: (title) => {
        return `${title} | ${t("page.profile")}`;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>adwdsdw</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BupDkBmr.mjs.map
