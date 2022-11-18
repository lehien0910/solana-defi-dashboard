import { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Radio } from 'antd';

type StackedChartProps = {
  dataSource: any;
}

export default function StackedChart({ dataSource }: StackedChartProps) {
  const [type, setType] = useState<'bar' | 'area'>('area')

  const { xAxisData, seriesData } = useMemo(() => {
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
          boundaryGap: false,
          data: xAxisData,
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: seriesData,
    }
  }, [seriesData, xAxisData])

  return (
    <div>
      <Radio.Group onChange={e => setType(e.target.value)}>
        <Radio.Button value="area">Area</Radio.Button>
        <Radio.Button value="bar">Bar</Radio.Button>
      </Radio.Group>
      <ReactECharts option={options} opts={{ height: 350 }} />
    </div>
  )
}