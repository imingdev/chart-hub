import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import { detailById } from '@/service/chart';

const usePageData = () => {
  const { id } = useParams();

  const { data, loading } = useRequest(
    () => detailById(id),
    {
      refreshDeps: [id],
    },
  );

  const { result, isNotData } = useMemo(() => {
    const rD = data?.result;

    return {
      isNotData: !rD,
      result: rD,
    };
  }, [data]);

  return {
    loading,
    isNotData,
    data: result,
  };
};

export default usePageData;
