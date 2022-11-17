import { useMemo } from 'react'
import { Table } from 'antd'

import styles from '../styles/dashboard.module.css'
import { columns } from './tableConfig'

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
    <div>
      <Table dataSource={parsedData} columns={columns} pagination={false} />
    </div>
  )
}