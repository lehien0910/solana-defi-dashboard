import { useMemo } from 'react'

import { PieChart } from '../../common'
import { getPlatformName } from '../../../utils'

export default function TvlPieChart({ data }: any) {
  const parsedData = useMemo(() => {    
    const aggData: any =  Object.values(data).reduce((agg: any, curr: any) => {      
      const lastIndex = curr.length - 1

      agg = [
        ...agg,
        {
          name: getPlatformName(curr[lastIndex].source),
          value: curr[lastIndex].value
        }
      ]

      return agg
    }, [])

    const seriesData = aggData.sort((a: any, b: any) => b.value - a.value)
    const legendData = aggData.map((item: any) => getPlatformName(item.name))

    return { legendData, seriesData }
  }, [data])

  return (
    <PieChart dataSource={parsedData} name="Tvl" />
  )
}