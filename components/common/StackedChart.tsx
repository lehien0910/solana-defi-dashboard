import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { Radio } from 'antd'
import { AreaChartOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons'

import { formatTimestamp } from '../../utils'

type StackedChartProps = {
  dataSource: any;
  setType: any;
  types?: string[];
}

const ChartIcon = (type: string) => {
  switch (type) {
    case 'area':
      return <AreaChartOutlined />
    case 'bar':
      return <BarChartOutlined />
    case 'line':
      return <LineChartOutlined />
    default:
      return type
  }
}

export default function StackedChart({
  dataSource,
  setType,
  types = ['area', 'bar'],
}: StackedChartProps) {
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
          data: dataSource.xAxisData?.map((timestamp: number) => formatTimestamp(timestamp)),
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
        {
          types.map((type: string) => {
            return <Radio.Button key={type} value={type}>{type}</Radio.Button>
          })
        }
      </Radio.Group>
      <ReactECharts option={options} opts={{ height: 350 }} />
    </div>
  )
}