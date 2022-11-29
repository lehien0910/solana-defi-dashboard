import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { formatNumber } from '../../utils';

type PieChartProps = {
  dataSource: any;
  name: string;
}

export default function PieChart({ dataSource, name }: PieChartProps) {

  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {          
          return `
            ${params.name} <br />
            <strong>${params.seriesName?.toLowerCase()?.includes('volume') ? '$' : ''}${formatNumber(params.value, 2)} (${params.percent}%)</strong>
          `
        },
      },
      series: [
        {
          name,
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: dataSource.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {},
          labelLine: {},
        }
      ]
    }
  },[dataSource])

  return (
    <ReactECharts option={options} />
  )
}