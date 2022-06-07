import { useEffect, useState } from 'react';
import { loadExternalCss, loadExternalScript } from './utils';

/**
 * 动态注入 JS 或 CSS 资源，useExternal 可以保证资源全局唯一
 * @param list 列表 格式为：[{path:地址,props：标签属性,type:js|css}]
 * @return {string} 加载状态，loading(加载中), ready(加载完成), error(加载失败)
 */
export const useMultipleExternal = (list = []) => {
  const [status, setStatus] = useState(list.length ? 'loading' : 'ready');

  useEffect(() => {
    if (!list.length) return;

    let elements = [];
    (async () => {
      setStatus('loading');
      try {
        elements = await Promise.all(list.map((path) => {
          const type = path.replace(/.+\./, '');
          if (type === 'css') return loadExternalCss(path);

          return loadExternalScript(path);
        }));

        setStatus('ready');
      } catch (e) {
        setStatus('error');
      }
    })();
    return () => {
      elements.forEach((row) => row?.remove());
    };
  }, []);

  return status;
};
