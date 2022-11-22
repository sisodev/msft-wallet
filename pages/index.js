import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MSFT-ENTRA</title>
        <meta name="description" content="Secure Wallet identity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1>Landing Page</h1>
    </div>
  )
}
