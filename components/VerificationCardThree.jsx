import {QRCodeSVG} from 'qrcode.react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/VerificationCardThree.module.css"



export default function VerificationCardThree({verified, hostname, handlVerificationStatus}) {
    const [scanIns, setScanIns] = useState(false)
    // const [isloading, setIsLoading] = useState(false)
    const [userActivity, setUserActivity] = useState("")
    const [presentationResponse, setPresentationResponse] =  useState({url: "", requestId: "", expiry: "", state: ""})
    const [success, setIsSuccess] = useState(false)




    useEffect(() => {
        if(success) {
            handlVerificationStatus("Verification complete")
            setIsSuccess(true)
        }
    }, [success])

    const polling = async (status) => {
            console.log(`the status id is ${status}`)
            const resp = await fetch(`/api/verifier/presentation-request-callback-polling?state=${status}`)
            const data = await resp.text()
            console.log(data)
            if (data === "Verification complete"){
                console.log("verification is completed")
                 setIsSuccess(true)
                 setUserActivity(data)             
                 console.log("show now show pop up")
            }else {
                console.log("verification pending...")
                setIsSuccess(false)
                setUserActivity(data)
            }
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
            console.log(`response from presentation request : ${JSON.stringify(data,null,2)}`)
            setPresentationResponse(data)
            intervalID = setInterval(() => polling(data.state), 2500)
            if(success) {
                clearInterval(intervalID)
            }
        }catch(e) {
            console.error(e)
        }
    }

    

    return(
        
        <div className={`${styles.verification__card__container} ${verified ? "" :  styles.card__blur}`}>
            <div className={styles.step__number}>
                <div className={styles.number_content}>
                    <h3>3</h3>
                </div>
            </div>
            <div className={styles.verification__explanation}>
                <div className={styles.verification__head}>
                    <h2>{scanIns ? "Scan the QR code" : "Access the"}</h2>
                    <h2>{scanIns ? "With the Microsoft": "personalized"}</h2>
                    <h2>{scanIns ? "Authenticator app":"employee portal"}</h2>
                </div>
                <div className={styles.step__desc}>
                    {scanIns ? <p>In the app, <b>open</b> the Verified ID tab</p>:<p>You will need a Verifiable</p>}
                    {scanIns ? <p>and <b>tap</b> on the QR code scan icon.</p>:<p>Credential and Microsoft.</p>}
                    {scanIns ? "":<p>Authenticator to access.</p>}
                </div>
            </div>
            { userActivity !== "" ? <div className={styles.verification__message}> <p>{userActivity}</p></div> : ""}
            {success ?  () => handlVerificationStatus("Verification complete"): ""}
            {scanIns ? <div className={styles.verification__qr__code}> 
                   { presentationResponse.url === "" ?  <div className={styles.placeholder}>Loading...</div> :  <QRCodeSVG value={presentationResponse.url} size={150} fgColor={"green"}/> } </div> : <div className={styles.verification__button}>
                            <button onClick={fetchPresentationRequest}><FontAwesomeIcon icon={faFileSignature} /> Access Personalized portal</button>
            </div>}
    </div>
    )
}

