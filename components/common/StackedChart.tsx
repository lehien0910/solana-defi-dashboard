import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { Radio } from 'antd';

type StackedChartProps = {
  dataSource: any;
  setType: any;
}

export default function StackedChart({ dataSource, setType }: StackedChartProps) {
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: { },
      grid: {
        top: '12%',
        left: '0',
        right: '0',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: dataSource.xAxisData,
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: dataSource.seriesData,
    }
  }, [dataSource])

  return (
    <div>
      <Radio.Group onChange={e => setType(e.target.value)}>
        <Radio.Button value="area">Area</Radio.Button>
        <Radio.Button value="bar">Bar</Radio.Button>
      </Radio.Group>
      <ReactECharts option={options} opts={{ height: 350 }} />
    </div>
  )
}