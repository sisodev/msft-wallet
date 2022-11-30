import Head from 'next/head'
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import ImageUpload from '../components/ImageUpload';



export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>MSFT-ENTRA</title>
        <meta name="description" content="Secure Wallet identity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1>Landing Page, {props.hostname}</h1>
        <ImageUpload/>
    </div>
  )
}


export async function getServerSideProps(context){
  // console.log(context.req)
  return {
    props: {
      hostname: context.req.headers.host
    }
  }
}