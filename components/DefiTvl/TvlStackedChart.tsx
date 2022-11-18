import { useMemo, useState } from 'react'
import { StackedChart } from '../common';

type StackedChartProps = {
  dataSource: any;
}

export default function TvlStackedChart({ dataSource }: StackedChartProps) {
  const [type, setType] = useState<'bar' | 'area'>('bar')

  const parsedData = useMemo(() => {
    const xAxisData = Object.values(dataSource)[0]?.reduce((agg: any, curr: any) => {
      agg = [...agg, curr.unixTime]
      return agg
    }, [])

    const seriesData: any = []

    for (let i = 0; i < Object.keys(dataSource).length; i++) {
      const name = Object.keys(dataSource)[i]
      
      const seriesItemData: any = {
        name,
        type,
        stack: 'dex',
        emphasis: {
          focus: 'series'
        },
        data: []
      }

      if (type === 'area') {
        seriesItemData.type = 'line'
        seriesItemData.areaStyle = {}
      }

      for (let j = 0; j < xAxisData.length; j++) {
        if (dataSource[name][j]?.unixTime === xAxisData[j]) {
          seriesItemData.data.push(dataSource[name][j].value)
        } else {
          seriesItemData.data.push(0)
        }
      }

      seriesData.push(seriesItemData)
    }

    seriesData.sort((a: any, b: any) => {
      const lastIndex = b.data.length - 1
      
      return b.data[lastIndex] - a.data[lastIndex]
    })
    
    return { xAxisData, seriesData }  
  }, [type, dataSource])

  return (
    <StackedChart dataSource={parsedData} setType={setType} />
  )
}