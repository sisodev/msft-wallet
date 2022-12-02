import Image from "next/image";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../store/AppContext";
import VerificationCardOne from "../components/VerificationCardOne";
import VerificationCardThree from "../components/VerificationCardThree";
import VerificationCardTwo from "../components/VerificationCardTwo";
import VerificationSuccess from "../components/VerificationSuccess";
import styles from "../styles/Verification.module.css"


// import {getSession} from  "../lib/get-session";

function Verification({hostname}) {
    const [isVerified, setIsVerified] = useState(false)
    const[verificationId, setverificationId] = useState("")
    const [isVerificationSuccess, setIsVerificationSuccess] = useState(false)
    const {fullname, issuanceId, setHostname} = useAppContext();

    useEffect(() => {
        setHostname(hostname)
    },[])

    const handleIsVerified = () =>{
        setIsVerified(!isVerified)
    }

    useEffect(() => {
        if(issuanceId !== "") {
            setIsVerified(true)
        } 
    }, [issuanceId])


    return(
        <>
        <div className={styles.verification__container}>
            <div className={styles.verification_banner}>
                <Image src="/approved_photo_banner.jpg" alt="banner" width={1800} height={190} />
            </div>
            <div className={styles.verification__welcome}>
                <h2>Hi {fullname.indexOf(" ") === -1 ? fullname : fullname.split(" ")[0]},</h2>
                {issuanceId !== "" ? <h2>Lets verify your signatory status to access <br/> your privileges </h2> : <h2>Lets create your digital credential</h2>}
            </div>
        </div>
        <div className={styles.verification__cards}>
            <VerificationCardOne verified={isVerified} changeIsVerified={handleIsVerified}/>
            <VerificationCardTwo verified={isVerified}/>
            <VerificationCardThree verified={isVerified} setIsVerificationSuccess={setIsVerificationSuccess} setverificationId={setverificationId}/>
        </div>
          {isVerificationSuccess ? <VerificationSuccess verificationId={verificationId}/> : ""}
        </>
    )
}


export async function getServerSideProps(context) {
    console.log(`the hostname in verification page is ${context.req.headers.host}`)
    return {
        props: {
            hostname: context.req.headers.host
        }
    }
}


export default withRouter(Verification);

