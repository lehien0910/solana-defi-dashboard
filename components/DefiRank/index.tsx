import { useMemo, useState } from 'react'
import { Table } from 'antd'

import styles from '../../styles/dashboard.module.css'
import { columns } from './tableConfig'
import RankPieChart from './RankPieChart'

const RANKING_FIELD: any = {
  totalTxs24h: {
    value: 'totalTxs24h',
    title: '24h Txs',
  },
  totalLiquidity: {
    value: 'totalLiquidity',
    title: 'Tvl',
  },
  totalVolume24h: {
    value: 'totalVolume24h',
    title: '24h Volume',
  },
  numberPairs: {
    value: 'numberPairs',
    title: 'Pools',
  },
}

export default function DefiRank({ data = [] }: any) {
  const [field, setField] = useState('totalVolume24h')

  const parsedData = useMemo(() => {
    let newData = data.sort((a: any, b: any) => b[field] - a[field])

    newData = newData.map((item: any, idx: number) => {
      item.key = idx + 1
      
      return item
    })

    return newData
  }, [data, field])

  const handleTableChange = (p: any, f: any, s: any) => {
    if (s?.field === field) return

    setField(s.field)
  }

  return (
    <div className={styles.feature}>
      <div className={styles.feature_header}>
        <h2 className={styles.feature_title}>Ranking by <span style={{color: "#4caf50"}}>{RANKING_FIELD[field].title}</span></h2>
      </div>

      <div className={styles.ranking}>
        <div className={styles.ranking_left_wrapper}>
          <Table
            dataSource={parsedData}
            columns={columns}
            pagination={false}
            onChange={handleTableChange}
          />
        </div>
        <div className={styles.ranking_right_wrapper}>  
          <RankPieChart data={parsedData} fieldInfo={RANKING_FIELD[field]} />
          <div className={styles.pie_chart_title}>{RANKING_FIELD[field].title} (%)</div>
        </div>
      </div>
    </div>
  )
}