import { Space } from 'antd'
import styles from '../../styles/platform.module.css'
import { abbrNumber, formatNumber } from '../../utils'
import { UpDown } from '../common'

export default function Overview({ data }: any) {

  return (
    <div className={styles.overview + " " + styles.feature}>
      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          Price {data.symbol}
        </div>
        <div className={styles.overview_item_content}>
          <Space>
            <span>${abbrNumber(data.price) || "__"}</span>
            <UpDown value={data.priceChange24h} fs="1.14rem" />
          </Space>
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          24h Volume
        </div>
        <div className={styles.overview_item_content}>
          <Space>
            <span>${abbrNumber(data.totalVolume24h) || "__"}</span>
            <UpDown value={data.totalVolume24hChangePercentage24h} fs="1.14rem" />
          </Space>
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          TVL
        </div>
        <div className={styles.overview_item_content}>
          <Space>
            <span>${abbrNumber(data.totalLiquidity) || "__"}</span>
            <UpDown value={data.totalLiquidityChangePercentage24h} fs="1.14rem" />
          </Space>
        </div>
      </div>

      {/* <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          24h Active User
        </div>
        <div className={styles.overview_item_content}>
          __
        </div>
      </div> */}

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          24h Txs
        </div>
        <div className={styles.overview_item_content}>
          <Space>
            <span>{abbrNumber(data.totalTxs24h) || "__"}</span>
            <UpDown value={data.totalTxsChangePercentage24h} fs="1.14rem" />
          </Space>
        </div>
      </div>

      <div className={styles.overview_item}>
        <div className={styles.overview_item_title}>
          Pools
        </div>
        <div className={styles.overview_item_content}>
          {formatNumber(data.numberPairs, 0) || "__"}
        </div>
      </div>
    </div>
  )
}