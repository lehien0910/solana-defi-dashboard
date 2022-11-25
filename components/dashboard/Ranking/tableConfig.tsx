import Link from 'next/link'
import { Space } from "antd"

import { abbrNumber, formatNumber, getPlatformName } from "../../../utils"
import UpDown from "../../common/UpDown"

export const columns = [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
    align: 'center' as const,
    width: 50,
  },
  {
    title: 'Platform',
    dataIndex: 'source',
    key: 'source',
    width: 130,
    ellipsis: true,
    render: (value: string, record: any) => {
      if (!value) return '__'

      return (
        <Link href={`/${value}`}>
          <Space>
            <img src={record.icon} alt="" width={20} height={20} />
            <span style={{textTransform: 'capitalize'}}>{getPlatformName(value)}</span>
          </Space>
        </Link>
      )
    }
  },
  {
    title: '24h Volume',
    dataIndex: 'totalVolume24h',
    key: 'totalVolume24h',
    align: 'right' as const,
    width: 150,
    defaultSortOrder: 'descend' as const,
    sorter: (a: any, b: any) => a.totalVolume24h - b.totalVolume24h,
    render: (value: number, record: any) => {
      if (!value) return '__'

      return <div>&#36;{abbrNumber(value)} <UpDown value={record.totalVolume24hChangePercentage24h} /></div>
    }
  },
  {
    title: '24h Txs',
    dataIndex: 'totalTxs24h',
    key: 'totalTxs24h',
    align: 'right' as const,
    width: 150,
    sorter: (a: any, b: any) => a.totalTxs24h - b.totalTxs24h,
    render: (value: number, record: any) => {
      if (!value) return '__'

      return <div>{abbrNumber(value)} <UpDown value={record.totalTxsChangePercentage24h} /></div>
    }
  },
  {
    title: 'TVL',
    dataIndex: 'totalLiquidity',
    key: 'totalLiquidity',
    align: 'right' as const,
    width: 150,
    sorter: (a: any, b: any) => a.totalLiquidity - b.totalLiquidity,
    render: (value: number, record: any) => {
      if (!value) return '__'

      return <div>&#36;{abbrNumber(value)} <UpDown value={record.totalLiquidityChangePercentage24h} /></div>
    }
  },
  {
    title: 'Pools',
    dataIndex: 'numberPairs',
    key: 'numberPairs',
    align: 'right' as const,
    width: 80,
    sorter: (a: any, b: any) => a.numberPairs - b.numberPairs,
    render: (value: number) => {
      if (!value) return '__'

      return <div>{formatNumber(value, 0)}</div>
    }
  },
]