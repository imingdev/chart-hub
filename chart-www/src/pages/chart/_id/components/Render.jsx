import React, { useMemo, useState } from 'react';
import ClassNames from 'classnames';
import { useExternal } from 'ahooks';
import PageLoading from '@/components/PageLoading';
import RenderJudge from '@/components/RenderJudge';
import { useMultipleExternal } from '@/common/hooks';
import useEcharts from '../utils/useEcharts';

import styles from '../style/Render.scss';

const RenderMain = ({ code, darkMode }) => {
  const { chartRef } = useEcharts({ code, darkMode });

  return (
    <div className={styles.echarts} ref={chartRef} />
  );
};

const Render = ({ data }) => {
  // 加载jquery
  const jqueryStatus = useExternal('/external/js/jquery.min.js');
  // 加载echarts
  const echartsStatus = useExternal(data.version && `//cdn.staticfile.org/echarts/${data.version}/echarts.min.js`);
  // 加载外部js
  const externalStatus = useMultipleExternal(data.externalScripts);

  const loading = useMemo(() => !(jqueryStatus === 'ready' && echartsStatus === 'ready' && externalStatus === 'ready'), [jqueryStatus, echartsStatus, externalStatus]);

  const [isSelect, setIsSelect] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headItem}>
          <div
            className={ClassNames(styles.switch, { [styles.isActive]: isSelect })}
            onClick={() => setIsSelect(!isSelect)}
          >
            <div className={styles.switchIcon} />
            <div className={styles.switchLabel}>深色模式</div>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <RenderJudge
          value={loading}
          active={(
            <PageLoading height="100%" />
          )}
          inactive={(
            <RenderMain code={data.code} />
          )}
        />
      </div>
    </div>
  );
};

export default Render;
