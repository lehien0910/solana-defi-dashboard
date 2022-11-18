import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import PieChart from '../common/PieChart'

export default function RankPieChart({ data }: any) {

  const parsedData = useMemo(() => {    
    return data.reduce((agg: any, curr: any) => {      
      agg.legendData = [...agg.legendData, curr.source]
      agg.seriesData = [
        ...agg.seriesData,
        {
          name: curr.source,
          value: curr.totalVolume24h
        }
      ]

      return agg
    }, {legendData: [], seriesData: []})
  }, [data])

  return (
    <PieChart dataSource={parsedData} />
  )
}