import Image from 'next/image'
import Link from 'next/link'
import { Space } from 'antd'

export default function Layout({ children }: any) {
  return (
    <div className="container">
      <header className="main_header">
        <div className="main_logo">
          <div className="main_logo_text"><span className="main_logo_text_highlight">defi</span> terminal</div>
        </div>
        <div>
          <Link href="/">Home</Link>
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