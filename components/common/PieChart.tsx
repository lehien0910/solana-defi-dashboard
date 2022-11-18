import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'

export default function PieChart({ dataSource }: any) {

  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 30,
        bottom: 30,
        data: dataSource.legendData
      },
      series: [
        {
          name: '24h Volume',
          type: 'pie',
          radius: '90%',
          center: ['40%', '50%'],
          data: dataSource.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
        }
      ]
    }
  },[dataSource])

  return (
    <ReactECharts option={options} />
  )
}