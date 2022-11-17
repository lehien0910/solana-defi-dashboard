import { abbrNumber } from "../../utils";

export const columns = [
  {
    title: '#',
    dataIndex: 'no',
    key: 'no',
    align: 'center' as const,
    width: 60,
  },
  {
    title: 'Platform',
    dataIndex: 'source',
    key: 'source',
    width: 160,
    ellipsis: true,
  },
  {
    title: '24h Volume',
    dataIndex: 'totalVolume24h',
    key: 'totalVolume24h',
    align: 'right' as const,
    defaultSortOrder: 'descend' as const,
    sorter: (a: any, b: any) => a.totalVolume24h - b.totalVolume24h,
    render: (value: number) => {
      if (!value) return '__'

      return <div>&#36;{abbrNumber(value)}</div>
    }
  },
  {
    title: 'TVL',
    dataIndex: 'totalLiquidity',
    key: 'totalLiquidity',
    align: 'right' as const,
    sorter: (a: any, b: any) => a.totalLiquidity - b.totalLiquidity,
    render: (value: number) => {
      if (!value) return '__'

      return <div>&#36;{abbrNumber(value)}</div>
    }
  },
  {
    title: '24h Txs',
    dataIndex: 'totalTxs24h',
    key: 'totalTxs24h',
    align: 'right' as const,
    sorter: (a: any, b: any) => a.totalTxs24h - b.totalTxs24h,
    render: (value: number) => {
      if (!value) return '__'

      return <div>{abbrNumber(value)}</div>
    }
  },
]