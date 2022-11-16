import { useMemo } from 'react'
import styles from '../styles/dashboard.module.css'

export default function DefiOverview({ data }: any) {
  const overviewDexData = useMemo(() => {
    if (!data) return {}

    return data.reduce((agg: any, curr: any, idx: number) => {
      if (idx === 0) {
        agg.numberPairs = curr.numberPairs || 0
        agg.totalLiquidity = curr.totalLiquidity || 0
        agg.totalTxs24h = curr.totalTxs24h || 0
        agg.totalVolume24h = curr.totalVolume24h || 0
      } else {
        agg.numberPairs = agg.numberPairs + curr.numberPairs
        agg.totalLiquidity = agg.totalLiquidity + curr.totalLiquidity
        agg.totalTxs24h = agg.totalTxs24h + curr.totalTxs24h
        agg.totalVolume24h = agg.totalVolume24h + curr.totalVolume24h
      }
      
      return agg
    }, {})
  }, [data])

  return (
    <div className={styles.overview + " " + styles.feature}>
      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          Platforms
        </div>
        <div className={styles.overview_item_content}>
          {data?.length || "__"}
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          24h Volume
        </div>
        <div className={styles.overview_item_content}>
          {overviewDexData.totalVolume24h || "__"}
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          TVL
        </div>
        <div className={styles.overview_item_content}>
          {overviewDexData.totalLiquidity || "__"}
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          24h Active User
        </div>
        <div className={styles.overview_item_content}>
          __
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          24h Txs
        </div>
        <div className={styles.overview_item_content}>
          {overviewDexData.totalTxs24h || "__"}
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          Markets
        </div>
        <div className={styles.overview_item_content}>
          {overviewDexData.numberPairs || "__"}
        </div>
      </div>
    </div>
  )
}