import { withRouter } from "next/router"
import styles from "../../styles/IssuanceSave.module.css"
import {QRCodeSVG} from 'qrcode.react';
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
// import { getSession } from "../../lib/get-session";

function IssuanceSave({router}) {
    const {url, pin}= router.query;

    const pollForResponse = async () => {
       const response =  await fetch("/api/issuer/issuance-response")
       console.log(JSON.parse(response))
    }

    useEffect(() => {
        const myInterval = setInterval(pollForResponse, 2500);
        return () => clearInterval(myInterval);
    }, [])


    return(
        <>
            <div className={styles.issuance__save__container}>
                <div className={styles.issuance__header}>
                    <div className={styles.issuance__title}><h1>True Identity</h1></div>
                    <div className={styles.issuance__heading}><h2>Issue my Verified ID</h2></div>
                </div>
            </div>
            <div className={styles.issuance__identity__info__card}>
                <div className={styles.issuance__identity__header}>
                    <h2>Scan the QR code with Microsoft</h2>
                    <h2>Authenticator to retrieve and save your</h2>
                    <h2>Verified ID</h2>
                </div>
                <div className={styles.issuance__identity__subtitle}>
                    <h3>Use this to prove who you are with other parties.</h3>
                </div>
                <div className={styles.issuance__identity__scan__info}>
                    <p>How to scan</p>
                    <p>In the app, <b>open</b> the verified ID tab and <b>tap</b> on the QR code scan icon.</p>
                </div>
                <div className={styles.issucane__qr__pin}>
                    <QRCodeSVG value={url} size={230}/>
                    <div className={styles.issuance__pin}>
                        Pin: {pin}
                    </div>
                </div>
                <div className={styles.issuance__authenticator__info}>
                    <div className={styles.issuance__authenticator__link}>
                        <Link href="https://www.microsoft.com/en-us/security/mobile-authenticator-app?rtc=1">Get Microsoft Authenticator</Link>
                    </div>
                    <div className={styles.issuance__authenticator__android__ios}>
                        <Image src="/google_store.png" alt="google_store" width={150} height={70} />
                        <Image src="/app_store.png" alt="app_store" width={150} height={40} />
                    </div>
                </div>
            </div>
        </>
    )
}

// import { getSession } from "../lib/get-session";

// export async function getServerSideProps({ req, res }) {
//   const session = await getSession(req, res);

//   return {
//     props: {
//       dataInSession: session.,
//     },
//   };
// }

export default withRouter(IssuanceSave)

