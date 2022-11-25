import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Select } from 'antd'

import { Layout } from '../components/common'
import styles from '../styles/platform.module.css'
import { getPlatformName, abbrNumber } from '../utils'
import Overview from '../components/platform/Overview'

const { Option } = Select
const fetchPlatformList = () => fetch('https://api.solscan.io/amm/all').then((res) => res.json())

export default function PlatformDetails() {
  const router = useRouter()
  const { platform } = router.query
  const { data: platformListResult } = useSWR('fetchPlatformList', fetchPlatformList)

  const platformData = useMemo(() => {
    if (!platform || !platformListResult?.data) return {}

    return platformListResult.data.find((item: any) => item.source?.toLowerCase() === platform)
  }, [platform, platformListResult?.data])

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
        >
          {
            platformListResult?.data?.map((item: any, idx: number) => {
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
    </Layout>
  )
}