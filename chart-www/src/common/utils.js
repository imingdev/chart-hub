/**
 * @intro: 工具类.
 */

/**
 * 空函数
 */
export const empty = () => {
};

/**
 * 获取dom
 * @param target  节点
 * @param defaultElement  默认节点
 * @returns {*}
 */
export const getTargetElement = (target, defaultElement) => {
  if (!target) return defaultElement;

  let targetElement;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
};

/**
 * 滚动到顶部
 * @param target  目标dom
 * @param duration  持续时间
 */
export const backTop = ({ target = document, duration = 500 }) => {
  const el = getTargetElement(target);
  if (!el) return;

  const isDocument = el === document;
  const cubic = (value) => value ** 3;
  const easeInOutCubic = (value) => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2);

  let beginValue = 0;
  if (isDocument) {
    const { documentElement, body } = document;
    beginValue = body.scrollTop || documentElement.scrollTop;
  } else {
    beginValue = el.scrollTop;
  }

  const beginTime = Date.now();
  const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / duration;
    let scrollTop;
    if (progress < 1) {
      scrollTop = beginValue * (1 - easeInOutCubic(progress));
      rAF(frameFunc);
    } else {
      scrollTop = 0;
    }
    if (isDocument) {
      document.documentElement.scrollTop = scrollTop;
      document.body.scrollTop = scrollTop;
    } else {
      el.scrollTop = scrollTop;
    }
  };
  rAF(frameFunc);
};

/**
 * 监听事件
 * @element dom
 * @event 事件名字
 * @handler 事件回调
 */
export const addEventListener = (() => {
  if (document.addEventListener) {
    // eslint-disable-next-line func-names
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  // eslint-disable-next-line func-names
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
})();

/**
 * 移除事件
 * @element dom
 * @event 事件名字
 * @handler 事件回调
 */
export const removeEventListener = (() => {
  if (document.removeEventListener) {
    // eslint-disable-next-line func-names
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  // eslint-disable-next-line func-names
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
})();

/**
 * 只监听一次事件
 * @element dom
 * @event 事件名字
 * @handler 事件回调
 */
export const addOnceEventListener = (el, event, fn) => {
  // eslint-disable-next-line func-names
  const listener = function () {
    // eslint-disable-next-line prefer-rest-params
    if (fn) fn.apply(this, arguments);

    removeEventListener(el, event, listener);
  };
  addEventListener(el, event, listener);
};

/**
 * 加载外部css
 * @param path  路径
 * @param props  标签支持的属性
 * @returns {Promise}
 */
export const loadExternalCss = (path, props = {}) => new Promise((resolve, reject) => {
  const link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = path;
  Object.keys(props).forEach((key) => {
    link[key] = props[key];
  });
  // IE9+
  const isLegacyIECss = 'hideFocus' in link;
  // use preload in IE Edge (to detect load errors)
  if (isLegacyIECss && link.relList) {
    link.rel = 'preload';
    link.as = 'style';
  }
  document.head.appendChild(link);

  const handle = (event) => {
    const fn = event.type === 'load' ? resolve : reject;

    return fn(link);
  };

  addOnceEventListener(link, 'load', handle);
  addOnceEventListener(link, 'error', handle);
});

/**
 * 加载外部js
 * @param path  路径
 * @param props 标签支持的属性
 * @returns {Promise}
 */
export const loadExternalScript = (path, props = {}) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = path;

  Object.keys(props).forEach((key) => {
    script[key] = props[key];
  });

  document.body.appendChild(script);

  const handle = (event) => {
    const fn = event.type === 'load' ? resolve : reject;

    return fn(script);
  };

  addOnceEventListener(script, 'load', handle);
  addOnceEventListener(script, 'error', handle);
});

/**
 * 代码编译的缓存
 * @type {Map<any, any>}
 */
export const compileCodeCache = new Map();

/**
 * 代码编译
 * @param srcStr 源代码字符串
 * @param obj 对象
 * @return {Promise}
 */
export const compileCode = (srcStr, obj) => new Promise((resolve, reject) => {
  const name = 'sandboxName';
  try {
    let compilerFn = compileCodeCache.get(srcStr);

    if (!compilerFn) {
      // eslint-disable-next-line no-new-func
      compilerFn = new Function(name, `with(${name}){${srcStr}}`);
      compileCodeCache.set(srcStr, compilerFn);
    }
    compilerFn(obj);

    resolve(obj);
  } catch (e) {
    reject(e);
  }
});
