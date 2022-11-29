import { useMemo } from 'react'
import styles from '../../../styles/platform.module.css'
import TvlStackedChart from './TvlStackedChart'

export default function Tvl({ data }: any) {
  // format source data to same length
  const dataSource = useMemo(() => {
    if (Object.keys(data).length === 0) return data

    const normalSource: any = Object.values(data).reduce((agg: any, curr: any, index: number) => {
      if (agg.length < curr?.length) {        
        agg.length = curr.length
        agg.source = curr[0].source
      }

      return agg
    }, { length: 0, idx: 0, source: '' })

    if (normalSource.length === 0) return data

    for (let i = 0; i < Object.keys(data).length; i++) {
      const name = Object.keys(data)[i]
      const length = [...data[name]].length

      if (length < normalSource.length) {
        for (let j = 0; j < normalSource.length - length; j++) {
          const tick = {
            unixTime: data[normalSource.source][j]?.unixTime,
            value: 0,
          }

          data[name].unshift(tick)
        }
      }
    }

    return data
  }, [data])

  return (
    <div className={styles.feature}>
      <div className={styles.feature_header}>
        <h2 className={styles.feature_title}>TVL (7D)</h2>
      </div>

      <div className={styles.tvl}>
        <TvlStackedChart dataSource={dataSource} />
      </div>
    </div>
  )
}