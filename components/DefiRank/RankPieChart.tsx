import { useMemo } from 'react'
import { PieChart } from '../common'

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
    <PieChart dataSource={parsedData} name="Ranking" />
  )
}