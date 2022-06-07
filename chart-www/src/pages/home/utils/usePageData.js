import { useEffect } from 'react';
import { useInfiniteScroll, useSetState } from 'ahooks';
import { list } from '@/service/chart';

const usePageData = ({ wrapperRef }) => {
  const [query, setQuery] = useSetState({ classify: null, keyword: null });

  const { data, loading, loadingMore, noMore, cancel, reload } = useInfiniteScroll(
    (d) => list({
      ...query,
      page: (d?.page || 0) + 1,
      size: 30,
    })
      .then((res) => res?.result),
    {
      target: wrapperRef,
      isNoMore: (res) => {
        const { count, page, size } = res || {};

        if (!count) return true;

        return page * size >= count;
      },
    },
  );

  useEffect(() => {
    cancel();
    reload();
  }, [query]);

  // 设置分类
  const setClassifyHandle = (classify) => setQuery({ classify });

  return {
    loading,
    loadingMore,
    noMore,
    list: data?.list || [],
    query,
    setClassify: setClassifyHandle,
  };
};

export default usePageData;
