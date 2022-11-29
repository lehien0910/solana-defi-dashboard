import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { Radio, Tooltip } from 'antd'
import { AreaChartOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons'

import { formatNumber, formatTimestamp } from '../../utils'

type StackedChartProps = {
  dataSource: any;
  setType: any;
  types?: string[];
}

type ChartIconProps = {
  type: string;
}

const ChartIcon = ({ type }: ChartIconProps) => {
  switch (type) {
    case 'area':
      return <Tooltip title="Area chart"><AreaChartOutlined /></Tooltip>
    case 'bar':
      return <Tooltip title="Bar chart"><BarChartOutlined /></Tooltip>
    case 'line':
      return <Tooltip title="Line chart"><LineChartOutlined /></Tooltip>
    default:
      return <>type</>
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
        },
        valueFormatter: (value: number) => formatNumber(value, 2),
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
      <Radio.Group size="small" onChange={e => setType(e.target.value)}>
        {
          types.map((type: string) => {
            return <Radio.Button key={type} value={type}><ChartIcon type={type} /></Radio.Button>
          })
        }
      </Radio.Group>
      <ReactECharts option={options} opts={{ height: 350 }} />
    </div>
  )
}