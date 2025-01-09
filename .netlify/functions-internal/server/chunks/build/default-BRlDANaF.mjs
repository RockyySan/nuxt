import { withAsyncContext, useSSRContext, computed, ref, unref, resolveComponent, mergeProps, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderTeleport, ssrRenderClass } from 'vue/server-renderer';
import { f as defineStore, _ as _export_sfc, s as storeToRefs } from './server.mjs';
import { useI18n } from 'vue-i18n';
import { u as useCookie } from './cookie-DaDFWqWH.mjs';
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

const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const useService = async (service) => {
  try {
    const callbackFunction = (module, callback) => {
      if (callback && typeof callback === "function") {
        return callback(module.default.getInstance());
      }
      return module.default.getInstance();
    };
    const serviceModule = (callback) => {
      return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../services/AuthService.js": () => import('./AuthService-CQwCZy8K.mjs'), "../services/BaseService.js": () => import('./BaseService-DD57qP2C.mjs'), "../services/UserService.js": () => import('./UserService-B_vqosOi.mjs') }), `../services/${service}Service.js`, 3).then((module) => {
        return callbackFunction(module, callback);
      });
    };
    return serviceModule;
  } catch (error) {
    return {};
  }
};
const useTransformer = async (transformer) => {
  try {
    const callbackFunction = (module, callback) => {
      if (callback && typeof callback === "function") {
        return callback(module.default.getInstance());
      }
      return module.default.getInstance();
    };
    const transformerModule = (callback) => {
      return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../transformers/AuthTransformer.js": () => import('./AuthTransformer-jmxhrGaK.mjs'), "../transformers/UserTransformer.js": () => import('./UserTransformer-D3tPglEV.mjs') }), `../transformers/${transformer}Transformer.js`, 3).then(
        (module) => {
          return callbackFunction(module, callback);
        }
      );
    };
    if (!transformerModule) {
      return {};
    }
    return transformerModule;
  } catch (error) {
    return {};
  }
};
const useAuthenticate = () => {
  const cookie = useCookie("token", { maxAge: 20160 * 60 });
  const setAccessToken = (accessToken) => {
    cookie.value = accessToken;
  };
  const isLoggedIn = computed(() => cookie.value != null);
  return { setAccessToken, isLoggedIn };
};
const useAuthStore = defineStore("auth", () => {
  const user = ref({});
  const getMe = async () => {
    var _a;
    const [service, transformer] = await Promise.all([
      useService("User"),
      useTransformer("User")
    ]);
    const { data, error } = await service((module) => module.getMe());
    if (((_a = error.value) == null ? void 0 : _a.statusCode) === 401) {
      const { setAccessToken } = useAuthenticate();
      setAccessToken(null);
    }
    const res = await transformer((module) => module.fetch(data.value));
    if (res) {
      user.value = res;
    }
  };
  const setUser = (value) => {
    user.value = value;
  };
  return { user, getMe, setUser };
});
const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref(false);
  const showLoading = () => {
    isLoading.value = true;
  };
  const hideLoading = () => {
    isLoading.value = false;
  };
  return { isLoading, showLoading, hideLoading };
});
const useLoading = () => {
  const loadingStore = useLoadingStore();
  const { isLoading } = storeToRefs(loadingStore);
  const { showLoading, hideLoading } = loadingStore;
  return { isLoading, showLoading, hideLoading };
};
const _sfc_main$2 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading } = useLoading();
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="${ssrRenderClass([{ "d-none": !unref(isLoading) }, "position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center page-loading"])}" data-v-ff1b7767><div class="overlay" data-v-ff1b7767></div><div class="spinner-border" data-v-ff1b7767></div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loading/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ff1b7767"]]);
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    storeToRefs(authStore);
    useLoading();
    useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "top-header bg-primary text-white" }, _attrs))} data-v-c1972f50><div class="container" data-v-c1972f50><div class="d-flex justify-content-between align-items-center" data-v-c1972f50><div class="d-flex align-items-center" data-v-c1972f50>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/map",
        class: "text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="h4 mb-0 ms text-white" data-v-c1972f50${_scopeId}>Home</h1>`);
          } else {
            return [
              createVNode("h1", { class: "h4 mb-0 ms text-white" }, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Header/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c1972f50"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { isLoggedIn } = useAuthenticate();
    if (isLoggedIn.value) {
      [__temp, __restore] = withAsyncContext(() => useAuthStore().getMe()), await __temp, __restore();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loading = __nuxt_component_0;
      const _component_PageHeader = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Loading, null, null, _parent));
      _push(ssrRenderComponent(_component_PageHeader, null, null, _parent));
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BRlDANaF.mjs.map
