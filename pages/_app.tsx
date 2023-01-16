import 'antd/dist/reset.css';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="layout layout_main">
      <Component {...pageProps} />
    </div>
  )
}
