import Head from 'next/head'
import useSWR from 'swr'

import styles from '../styles/dashboard.module.css'
import { Layout } from "../components/common";
import Overview from '../components/dashboard/Overview'
import Ranking from '../components/dashboard/Ranking'
import Volume from '../components/dashboard/Volume'
import Tvl from '../components/dashboard/Tvl'

const to = new Date().getTime() / 1000
const from = to - 7 * 24 * 60 * 60

const fetchPlatformList = () => fetch('https://api.solscan.io/amm/all').then((res) => res.json())
const fetchVolumeChartData = () => fetch(`https://api.solscan.io/amm/chart?source=all&type=1D&chart=total_volume24h&time_from=${from}&time_to=${to}`).then((res) => res.json())
const fetchTvlChartData = () => fetch(`https://api.solscan.io/amm/chart?source=all&type=1D&chart=total_tvl&time_from=${from}&time_to=${to}`).then((res) => res.json())

export default function Dashboard() {
  const { data: platformListResult } = useSWR('fetchPlatformList', fetchPlatformList)
  const { data: chartData } = useSWR('fetchVolumeChartData', fetchVolumeChartData)
  const { data: tvlData } = useSWR('fetchTvlChartData', fetchTvlChartData)

  return (
    <Layout>
      <Head>
        <title>Defi Terminal</title>
        <meta name="description" content="DeFi Terminal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <div className={styles.feature_header}>
          <h1 className={styles.title}>
            Defi Terminal
          </h1>
        </div>

        <Overview data={platformListResult?.data || []} />

        <Ranking data={platformListResult?.data || []} />

        <Volume data={chartData?.data?.items || {}} />

        <Tvl data={tvlData?.data?.items || {}} />
      </>
    </Layout>
  )
}
