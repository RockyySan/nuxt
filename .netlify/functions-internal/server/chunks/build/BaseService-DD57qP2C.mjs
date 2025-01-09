import { computed, toValue, reactive, ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, unref } from 'vue';
import { k as fetchDefaults, f as defineStore, c as useRuntimeConfig, b as useNuxtApp, h as asyncDataDefaults, l as useRequestFetch, j as createError } from './server.mjs';
import { u as useCookie } from './cookie-DaDFWqWH.mjs';
import swal from 'sweetalert2';
import { J as hash } from '../_/nitro.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'vue-i18n';
import 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'consola/core';
import 'node:fs';
import 'node:path';

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = asyncDataDefaults.errorValue;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller, new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const useAuthPopupStore = defineStore("auth-popup", () => {
  const isShowLoginPopup = ref(false);
  const showLoginPopup = () => {
    isShowLoginPopup.value = true;
  };
  const hideLoginPopup = () => {
    isShowLoginPopup.value = false;
  };
  return { isShowLoginPopup, showLoginPopup, hideLoginPopup };
});
const isFunction = (func) => {
  if (func && typeof func === "function") {
    return true;
  }
  return false;
};
const useSwal = () => {
  const showSwal = (title = "", titleText = "", type = "info", confirm = () => {
  }, reject = () => {
  }, options = {}) => {
    swal.fire({
      title,
      text: titleText,
      icon: type,
      allowOutsideClick: () => !swal.isLoading(),
      ...options
    }).then((result) => {
      if (result.isConfirmed) {
        swal.close();
        if (isFunction(confirm)) {
          confirm();
        }
      } else {
        swal.close();
        if (isFunction(reject)) {
          reject();
        }
      }
    });
  };
  const success = (title, message, options = {}) => {
    showSwal(title, message, "success", options);
  };
  const info = (title, message, options = {}) => {
    showSwal(title, message, "info", options);
  };
  const error = (title, message, options = {}) => {
    showSwal(title, message, "error", options);
  };
  const warning = (title, message, confirm = () => {
  }, reject = () => {
  }, options = {}) => {
    showSwal(title, message, "warning", confirm, reject, options);
  };
  const question = (title, message, confirm = () => {
  }, reject = () => {
  }, options = {}) => {
    showSwal(title, message, "question", confirm, reject, options);
  };
  return {
    success,
    info,
    error,
    warning,
    question
  };
};
const useHttp = (url, options) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.serverApiUrl + "/" + config.public.apiVersion;
  const cookie = useCookie("token");
  const token = cookie.value;
  const { showLoginPopup } = useAuthPopupStore();
  options = {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-Type": "application/json",
      "X-SSDAP-Locale": "en"
    },
    async onResponseError({ request, response, options: options2 }) {
      var _a;
      if (response.status === 401) {
        cookie.value = null;
        await showLoginPopup();
      } else if (response.status !== 422) {
        if (await ((_a = response == null ? void 0 : response._data) == null ? void 0 : _a.message)) {
          const swal2 = await useSwal();
          await swal2.error("", response._data.message);
        }
      }
    }
  };
  return useFetch(url, { baseURL, ...options }, "$H54fdbas9U");
};
let instance = null;
class BaseService {
  constructor(prefix) {
    this._prefix = prefix;
  }
  static getInstance() {
    if (!instance) {
      instance = new BaseService();
    }
    return instance;
  }
  _get(path, params = null) {
    let payload2 = {};
    if (params) {
      payload2 = { body: params };
    }
    return useHttp(path, { method: "GET", ...payload2 });
  }
  _post(path, params = null) {
    let payload2 = {};
    if (params) {
      payload2 = { body: params };
    }
    return useHttp(path, { method: "POST", ...payload2 });
  }
  _put(path, params = null) {
    let payload2 = {};
    if (params) {
      payload2 = { body: params };
    }
    return useHttp(path, { method: "PUT", ...payload2 });
  }
  _delete(path, params = null) {
    return useHttp(path, { method: "DELETE", ...payload });
  }
}

export { BaseService as default };
//# sourceMappingURL=BaseService-DD57qP2C.mjs.map
