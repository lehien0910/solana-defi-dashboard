import Head from 'next/head'
import Image from 'next/image'
import { Space } from 'antd'
import useSWR from 'swr'

import styles from '../styles/dashboard.module.css'
import DefiOverview from '../components/DefiOverview'
import DefiRank from '../components/DefiRank'
import DefiVolume from '../components/DefiVolume'
import DefiTvl from '../components/DefiTvl'

const to = new Date().getTime() / 1000
const from = to - 7 * 24 * 60 * 60

console.log(from, to);


const fetchDexData = () => fetch('https://api.solscan.io/amm/all').then((res) => res.json())
const fetchVolumeChartData = () => fetch(`https://api.solscan.io/amm/chart?source=all&type=1D&chart=total_volume24h&time_from=${from}&time_to=${to}`).then((res) => res.json())
const fetchTvlChartData = () => fetch(`https://api.solscan.io/amm/chart?source=all&type=1D&chart=total_tvl&time_from=${from}&time_to=${to}`).then((res) => res.json())

export default function Dashboard() {
  const { data: dexData } = useSWR('fetchDexData', fetchDexData)
  const { data: chartData } = useSWR('fetchVolumeChartData', fetchVolumeChartData)
  const { data: tvlData } = useSWR('fetchTvlChartData', fetchTvlChartData)

  return (
    <div className={styles.container}>
      <Head>
        <title>Defi Dashboard</title>
        <meta name="description" content="Solana DeFi Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.feature_header}>
          <h1 className={styles.title}>
            Defi Dashboard
          </h1>
        </div>

        <DefiOverview data={dexData?.data || []} />

        <DefiRank data={dexData?.data || []} />

        <DefiVolume data={chartData?.data?.items || {}} />

        <DefiTvl data={tvlData?.data?.items || {}} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://solscan.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Space>
            Powered by
            <Image src="/solscan.png" alt="Solscan Logo" width={20} height={20} />
            Solscan
          </Space>
        </a>
      </footer>
    </div>
  )
}
