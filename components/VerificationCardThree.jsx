import {QRCodeSVG} from 'qrcode.react';
import {  useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'


import styles from "../styles/VerificationCardThree.module.css"
import Loader from './Loader';
import { useAppContext } from '../store/AppContext';




export default function VerificationCardThree({verified, setIsVerificationSuccess,setverificationId}) {

    const {hostname, verificationId,  } = useAppContext();
    
    const [scanIns, setScanIns] = useState(false)
    const [userActivity, setUserActivity] = useState("")
    const [verificationResponse, setVerificationResponse] = useState({url: "", requestId: "", expiry: "", state: ""})

    const handleVerificationData = (data) => {
        console.log(`got verification request data ::: ${JSON.stringify(data,null,2)}`)
        const {url, expiry, state, requestId} = data
        setVerificationResponse((prev) => ({...prev, url,expiry,state,requestId}))
    }



    const fetchPresentationRequest = async () => {
        setScanIns(!scanIns)
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify({hostname}),
            headers: {
            'Content-Type': 'application/json',
            }
        };

        try{
            const response = await fetch('api/verifier/presentation-request',fetchOptions)
            const data = await response.json()
            setverificationId(data.state)
            console.log(`response from presentation request : ${JSON.stringify(data,null,2)}`)
            handleVerificationData(data)
        }catch(e) {
            console.error(e)
        }
    }

    const polling = async () => {
        if(verificationResponse.state !== "") {
            try {
                const resp = await fetch(`/api/verifier/presentation-request-callback-polling?state=${verificationResponse.state}`)
                const data = await resp.text()
                if (data === "Verification complete"){
                    setUserActivity(data)
                    setIsVerificationSuccess(true)             
               }else {
                    setUserActivity(data)
                    setTimeout(() => polling(),2500)
               }
            }catch(e){
                console.log(err)
                setTimeout(() => polling(),2500)
            }  
        }   
    }

    useEffect(() => {
        polling()
    }, [verificationResponse.state])

   

    return(
        
        <div className={`${styles.verification__card__container} ${verified ? "" :  styles.card__blur}`}>
            <div className={styles.step__number}>
                <div className={styles.number_content}>
                    <h3>3</h3>
                </div>
            </div>
            <div className={styles.verification__explanation}>
                {userActivity === "QR Code is scanned." ? <div className={styles.verification__head}>
                                <h2>Follow instructions on your other <br/> device</h2>
                            </div> : <div className={styles.verification__head}>
                                        <h2>{scanIns ? "Scan the QR code" : "Access the personalized portal to use"}</h2>
                                        <h2>{scanIns ? "With the Microsoft": "your privileges"}</h2>
                                        <h2>{scanIns ? "Authenticator app":""}</h2>
                                    </div>           
                }
                { userActivity === "QR Code is scanned." ? <div className={styles.step__desc}>
                        <p>They will appear once your digital wallet loads <br/> on your device</p>
                </div> : <div className={styles.step__desc}>
                    {scanIns ? <p>In the app, <b>open</b> the Verified ID tab</p>:<p>You will need a verifiable</p>}
                    {scanIns ? <p>and <b>tap</b> on the QR code scan icon.</p>:<p>credential and the Microsoft  Authenticator App to get your</p>}
                    {scanIns ? "":<p>privileges.</p>}
                </div>

                }
                
            </div>
            {/* { userActivity !== "" && userActivity !== "pending" ? <div className={styles.verification__message}> <p>{userActivity}</p></div> : ""} */}
            {scanIns ? <div className={styles.verification__qr__code}> 
                   { verificationResponse.url === "" ?  <div className={styles.placeholder}>Loading...</div> : userActivity === "QR Code is scanned." ? <div className={styles.loading__message}><Loader/> <p className={styles.loading__info}> waiting for digital wallet</p> </div>: <QRCodeSVG value={verificationResponse.url} size={150} fgColor={"green"}/> } </div> : <div className={styles.verification__button}>
                            <button onClick={fetchPresentationRequest}> Access my Personalized portal</button>
            </div>}
    </div>
    )
}

