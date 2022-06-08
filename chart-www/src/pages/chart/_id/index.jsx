import React from 'react';
import { useSetState } from 'ahooks';
import PageLoading from '@/components/PageLoading';
import NotPage from '@/components/NotPage';
import Editor from './components/Editor';
import Render from './components/Render';
import usePageData from './utils/usePageData';

import styles from './style/index.scss';

const ChartDetailPageMain = ({ data: rData }) => {
  const [data, setData] = useSetState(rData);

  const onRunnerHandle = (code) => setData({ code });

  return (
    <main className={styles.container}>
      <Editor className={styles.inner} code={data.code} onRunner={onRunnerHandle} />
      <Render className={styles.inner} data={data} />
    </main>
  );
};

const ChartDetailPage = () => {
  const { loading, isNotData, data } = usePageData();

  if (loading) {
    return (
      <PageLoading />
    );
  }
  if (isNotData) {
    return (
      <NotPage />
    );
  }

  return (
    <ChartDetailPageMain data={data} />
  );
};

export default ChartDetailPage;
