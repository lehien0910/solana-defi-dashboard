import { useMemo } from 'react'
import { PieChart } from '../common'

type RankPieChartProps = {
  data: any;
  fieldInfo: {
    value: string,
    title: string,
  }
}

export default function RankPieChart({ data, fieldInfo }: RankPieChartProps) {

  const parsedData = useMemo(() => {    
    return data.reduce((agg: any, curr: any) => {      
      agg.legendData = [...agg.legendData, curr.source]
      agg.seriesData = [
        ...agg.seriesData,
        {
          name: curr.source,
          value: curr[fieldInfo.value]
        }
      ]

      return agg
    }, {legendData: [], seriesData: []})
  }, [data, fieldInfo.value])

  return (
    <PieChart dataSource={parsedData} name={fieldInfo.title} />
  )
}