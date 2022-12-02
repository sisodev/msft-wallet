import { withRouter } from "next/router"
import styles from "../../styles/IssuanceSave.module.css"
import {QRCodeSVG} from 'qrcode.react';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import IssuanceSuccess from "../../components/IssuanceSuccess";
import { useAppContext } from "../../store/AppContext";

// const delay = ms => new Promise(res => setTimeout(res, ms));

function IssuanceSave({router}) {
    const {url, pin, state, fullname}= router.query;
    const [userActivity, setUserActivity] = useState("")
    const [success, setIsSuccess] = useState(false)

    const {setIssuanceId} = useAppContext()

    const polling = async () => {
        if(state !== null || state !== "") {
            const resp = await fetch(`/api/issuer/issuance-request-callback-polling?state=${state}`)
            const data = await resp.text()
            if( data.match("Credential successfully issued")) {
                setUserActivity("Credential successfully issued")
                setIsSuccess(true)
                setIssuanceId(state)
                return
            }else if (data.match("QR Code is scanned. Waiting for issuance to complete...")){
                setIsSuccess(false)
                setUserActivity(data)
                setTimeout(() => polling(),2500)
            }else {
                setIsSuccess(false)
                setUserActivity("")
                setTimeout(() => polling(),2500)
            }
        }
        
    }

    useEffect(() => {
        polling()
    },[])


    return(
    <>
        <div className={styles.issuance__save__wrapper}>
            <div className={styles.issuance__save__container}>
                <div className={styles.issuance__header}>
                    <div className={styles.issuance__title}><h1>Microsoft Treasury</h1></div>
                    <div className={styles.issuance__heading}><h2>Issue my Treasury Verified ID</h2></div>
                </div>
            </div>
            {success ?  <IssuanceSuccess fullname={fullname}/> : <div className={styles.issuance__identity__info__card}>
                <div className={styles.issuance__identity__header}>
                    <h2>Scan the QR code with Microsoft Authenticator to</h2>
                    <h2>retrieve and save your Microsoft Treasury Verified ID</h2>
                    <h2></h2>
                </div>
                <div className={styles.issuance__identity__subtitle}>
                    <h3>Use this to prove your status as a privileged signatory</h3>
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
                    <div className={styles.issuance__user__activity}>
                        {userActivity !== ""? <h3>{userActivity}</h3> : ""}
                        {userActivity === "Credential successfully issued" ? setIsSuccess(true):  ""}
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
            </div>}
        </div>
    </>
    )
}

export default withRouter(IssuanceSave)

// export async function getServerSideProps({req,res}) {
//     const session = await getSession(req,res)
//     session.message = session.message ? session.message : "nothing here.."
//     console.log(`the session message is ${session.message}`)
//     return {
//         props: {
//             issuance_state : session.message
//         }
//     }
// }