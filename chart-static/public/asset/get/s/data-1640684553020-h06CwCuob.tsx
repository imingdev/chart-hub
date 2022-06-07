import { FC, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.scss';
import { pieColor } from './config';

type EChartsOption = echarts.EChartsOption;

interface IProps {
  title: string;
  name: string;
  options: BasicConfig[];
  dataSource: any[];
  changeField: (name: string, key: string) => void;
}

const PieAndBar: FC<IProps> = (props) => {
  const { title, name, options, dataSource, changeField } = props;
  const wrapper = useRef<HTMLElement>();
  const chart = useRef<echarts.ECharts>();
  const dataName = ['外购', '自发电', '总发电量'];
  const dataValue = [20, 30, 50];

  const initChart = () => {
    // 图表配置
    const option: EChartsOption = {
      tooltip: {},
      grid: [{ x: '10%', y: '7%', width: '30%', height: '80%' }],
      /**    总发电量 */
      color: ['#73ACFF', '#DECD85', '#64B7FF'],
      xAxis: {
        show: false,
        gridIndex: 0,
      },

      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: true,
        nameGap: 20,
        axisLabel: {
          fontSize: '12px',
          fontFamily: 'PingFangSC-Semibold, PingFang SC',
          fontWeight: 600,
          color: '#FFFFFF',
          verticalAlign: 'middle',
          align: 'left',
          padding: [2, 2, 2, -20],
        },
        gridIndex: 0,
        data: dataName,
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              formatter: (params: any) => `${params.value}MW`,
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'DINAlternate-Bold, DINAlternate',
              fontWeight: 'bold',
            },
          },
          itemStyle: {
            barBorderRadius: 120,
          },
          data: dataValue,
        },
        {
          type: 'pie',
          data: [
            { value: dataValue[0], name: dataName[0] },
            { value: dataValue[1], name: dataName[1] },
            { value: dataValue[2], name: dataName[2] },
          ],
          radius: '50%',
          center: ['70%', '50%'],
        },
      ],
    };
    chart.current?.setOption(option, true);
  };

  useEffect(() => {
    chart.current = echarts.init(wrapper.current!);
    const onResize = () => {
      chart.current?.resize();
    };
    window.addEventListener('resize', onResize);
    initChart();
    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return (
    <div className={styles.main}>
      <div ref={wrapper as any} className={styles.chartContent} />
      <div className={styles.total}>
        <div>{0}</div>
        <div>个</div>
      </div>
    </div>
  );
};
export default PieAndBar;
