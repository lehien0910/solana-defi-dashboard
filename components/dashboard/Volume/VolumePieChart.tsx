import { useMemo } from 'react'

import { getPlatformName } from '../../../utils'
import { PieChart } from '../../common'

export default function VolumePieChart({ data }: any) {
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
    <PieChart dataSource={parsedData} name="24h Volume" />
  )
}