import Image from 'next/image'
import { Space } from 'antd'

import styles from '../../styles/dashboard.module.css'

export default function Layout({ children }: any) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {children}
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