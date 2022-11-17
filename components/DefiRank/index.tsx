import { useMemo } from 'react'
import { Table } from 'antd'

import styles from '../../styles/dashboard.module.css'
import { columns } from './tableConfig'
import PieChart from './PieChart'

export default function DefiRank({ data = [] }: any) {

  const parsedData = useMemo(() => {
    let newData = data.sort((a: any, b: any) => b.totalVolume24h - a.totalVolume24h)

    newData = newData.map((item: any, idx: number) => {
      item.no = idx + 1
      
      return item
    })

    return newData
  }, [data])

  return (
    <div className={styles.feature}>
      <div className={styles.feature_header}>
        <h2 className={styles.feature_title}>Ranking</h2>
      </div>
      <div className={styles.ranking}>
        <div className={styles.ranking_table_wrapper}>
          <Table dataSource={parsedData} columns={columns} pagination={false} />
        </div>
        <div className={styles.ranking_chart_wrapper}>  
          <PieChart dataSource={parsedData} />
        </div>
      </div>
    </div>
  )
}