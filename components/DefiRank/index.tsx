import { useMemo } from 'react'
import { Table } from 'antd'

import styles from '../styles/dashboard.module.css'
import { columns } from './tableConfig'

export default function DefiRank({ data = [] }: any) {

  const parsedData = useMemo(() => {
    return data.map((item: any, idx: number) => {
      item.no = idx + 1
      
      return item
    })
  }, [data])

  return (
    <div>
      <Table dataSource={parsedData} columns={columns} pagination={false} />
    </div>
  )
}