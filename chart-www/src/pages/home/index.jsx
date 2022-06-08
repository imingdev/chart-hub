import React, { useRef } from 'react';
import RenderJudge from '@/components/RenderJudge';
import PageLoading from '@/components/PageLoading';
import Loading from '@/components/Loading';
import Sidebar from './components/Sidebar';
import ItemCard from './components/ItemCard';
import usePageData from './utils/usePageData';

import styles from './style/index.scss';

const HomePage = () => {
  const wrapperRef = useRef();

  const { loading, loadingMore, noMore, list, query, setClassify } = usePageData({ wrapperRef });

  return (
    <main className={styles.container}>
      <Sidebar value={query.classify} onChange={setClassify} />
      <div className={styles.wrapper} ref={wrapperRef}>
        <RenderJudge
          value={loading}
          active={(
            <PageLoading />
          )}
          inactive={(
            <div className={styles.inner}>
              {list.map((row, index) => (
                <div className={styles.item} key={index}>
                  <ItemCard id={row.id} label={row.title} image={row.thumbnail} version={row.version} />
                </div>
              ))}
            </div>
          )}
        />
        <RenderJudge
          value={loadingMore}
          active={(
            <div className={styles.footerLoad}>
              <div>
                <Loading className={styles.loadIcon} />
              </div>
              <div className={styles.loadText}>正在加载...</div>
            </div>
          )}
        />
        <RenderJudge
          value={!loading && noMore}
          active={(
            <div className={styles.footerLoad}>
              <div className={styles.noMore}>没有更多了</div>
            </div>
          )}
        />
      </div>
    </main>
  );
};

export default HomePage;
