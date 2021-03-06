import { useEffect, useRef, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { addEventListener, compileCode, removeEventListener } from '@/common/utils';

const useEcharts = ({ code }) => {
  const chartRef = useRef();
  // echarts实例
  const [instance, setInstance] = useState(null);
  // 错误
  const [error, setError] = useState(null);

  // 初始化echarts
  const initEchartsHandle = async () => {
    let ins = instance;
    if (!ins) {
      ins = global.echarts.init(chartRef.current);
      setInstance(ins);
    }

    try {
      const { option } = await compileCode(code, {
        myChart: ins,
        app: {},
        option: null,
      });
      if (option && typeof option === 'object') {
        ins.setOption(option);
      }
      setError(null);
    } catch (e) {
      setError(e);
    }
  };

  // 销毁echarts
  const destroyEchartsHandle = () => {
    instance?.dispose();
    return setInstance(null);
  };

  useEffect(() => {
    if (!code) return;

    (async () => {
      await initEchartsHandle();
    })();

    return () => {
      destroyEchartsHandle();
    };
  }, [code]);

  const { run: resizeHandle } = useDebounceFn(() => instance?.resize(), { wait: 100 });

  useEffect(() => {
    addEventListener(window, 'resize', resizeHandle);

    return () => {
      removeEventListener(window, 'resize', resizeHandle);
    };
  }, []);

  return {
    instance,
    error,
    chartRef,
  };
};

export default useEcharts;
