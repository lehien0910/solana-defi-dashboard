import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { useMemo } from 'react'
import { Space, Select } from 'antd'
import { useRouter } from 'next/router'

import styles from '../../styles/layout.module.css'
import { getPlatformName, abbrNumber } from '../../utils'

const { Option } = Select

const fetchPlatformList = () => fetch('https://api.solscan.io/amm/all').then((res) => res.json())

export default function Layout({ children }: any) {
  const router = useRouter()
  const { data: platformListResult } = useSWR('fetchPlatformList', fetchPlatformList)

  const platformList = useMemo(() => {
    return platformListResult?.data?.sort((a: any, b: any) => b.totalVolume24h - a.totalVolume24h) || []
  }, [platformListResult?.data])

  const onChange = (value: string) => {
    router.push(value)
  }

  return (
    <div className="container">
      <header className="main_header">
        <div className="main_logo">
          <Link href="/">
            <div className="main_logo_text"><span className="main_logo_text_highlight">defi</span> terminal</div>
          </Link>
        </div>

        <div className={styles.main_nav}>
          <Link href="/">Home</Link>
          <Select
            showSearch
            size="large"
            className={styles.select}
            placeholder="Select a platform"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.value ?? '')?.toString().toLowerCase().includes(input.toLowerCase())
            }
          >
            {
              platformList.map((item: any, idx: number) => {
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
                    disable={true}
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
      </header>

      <main className="main_content">
        {children}
      </main>

      <footer className="main_footer">
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