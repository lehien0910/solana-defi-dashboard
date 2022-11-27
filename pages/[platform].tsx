import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Select } from 'antd'

import { Layout } from '../components/common'
import styles from '../styles/platform.module.css'
import { getPlatformName, abbrNumber } from '../utils'
import Overview from '../components/platform/Overview'
import Volume from '../components/platform/Volume'

const to = new Date().getTime() / 1000
const from = to - 7 * 24 * 60 * 60

const { Option } = Select
const fetchPlatformList = () => fetch('https://api.solscan.io/amm/all').then((res) => res.json())
const fetchVolumeChartData = () => fetch(`https://api.solscan.io/amm/chart?source=all&type=1D&chart=total_volume24h&time_from=${from}&time_to=${to}`).then((res) => res.json())

export default function PlatformDetails() {
  const router = useRouter()
  const { platform } = router.query
  const { data: platformListResult } = useSWR('fetchPlatformList', fetchPlatformList)
  const { data: chartVolumeDataResult } = useSWR('fetchVolumeChartData', fetchVolumeChartData)

  const { platformData, filteredPlatformList } = useMemo(() => {
    if (!platform || !platformListResult?.data) return { platformData: [], filteredPlatformList: [] }

    const platformData = platformListResult.data.find((item: any) => item.source?.toLowerCase() === platform)
    const filteredPlatformList = platformListResult.data.filter((item: any) => item.source?.toLowerCase() !== platform)

    return { platformData, filteredPlatformList }
  }, [platform, platformListResult?.data])

  const chartVolumeData = useMemo(() => {
    if (!chartVolumeDataResult?.data?.items || typeof platform !== "string") return {}

    return {
      [platform]: [
        ...chartVolumeDataResult?.data?.items[platform]
      ]
    }
  }, [chartVolumeDataResult?.data?.items])

  return (
    <Layout>
      <Head>
        <title>{`${getPlatformName(platform)} | Defi Terminal` || 'Defi Terminal'}</title>
        <meta name="description" content="DeFi Terminal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <h1 className={styles.title}>
          <img className={styles.logo} src={platformData?.icon} alt="" width={30} height={30} />
          <span>{getPlatformName(platform)}</span>
        </h1>
        <span className={styles.vs}>vs</span>
        <Select
          className={styles.select}
          mode="multiple"
          optionLabelProp="label"
          placeholder="Select to compare"
          size="large"
        >
          {
            filteredPlatformList.map((item: any, idx: number) => {
              return (
                <Option
                  key={idx}
                  value={item.source}
                  label={
                    <div className={styles.option_title}>
                      <img className={styles.logo} src={item.icon} alt="" width={15} height={15} />
                      <span className="capitalize">{getPlatformName(item.source)}</span>
                    </div>
                  }
                >
                  <div className={styles.option}>
                    <div className={styles.option_title}>
                      <img className={styles.logo} src={item.icon} alt="" width={20} height={20} />
                      <span className="capitalize">{getPlatformName(item.source)}</span>
                    </div>
                    <span className={styles.option_sub_title}>24h Vol: ${abbrNumber(item.totalVolume24h)}</span>
                  </div>
                </Option>
              )
            })
          }
        </Select>
      </div>

      <Overview data={platformData} />

      <Volume data={chartVolumeData || {}} />
    </Layout>
  )
}