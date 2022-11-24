import Head from 'next/head'
import io from "socket.io-client";
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'

let socket;

export default function Home(props) {

  const [message, setMessage] = useState("Landing Page")

  console.log(props)

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("news", (msg) => {
      console.log(msg.hello);
      setMessage(msg.hello)
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>MSFT-ENTRA</title>
        <meta name="description" content="Secure Wallet identity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1>Landing Page, {props.hostname}</h1>
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