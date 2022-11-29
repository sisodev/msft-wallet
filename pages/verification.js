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

function Verification({router, hostname}) {
    const [isVerified, setIsVerified] = useState(false)
    const[verificationId, setverificationId] = useState("")
    const [isVerificationSuccess, setIsVerificationSuccess] = useState(false)
    const name = router.query.name ? router.query.name.split(" ")[0] : "";

   

    const handleIsVerified = () =>{
        setIsVerified(!isVerified)
    }


    return(
        <>
        <div className={styles.verification__container}>
            <div className={styles.verification_banner}>
                <Image src="/verification_header_banner.png" lat="banner" width={1500} height={190} />
            </div>
            <div className={styles.verification__welcome}>
                <h2>Hi {name},</h2>
                <h2>Lets create your digital credential</h2>
            </div>
        </div>
        <div className={styles.verification__cards}>
            <VerificationCardOne name={ router.query.name ? router.query.name : "John Doe"} verified={isVerified} changeIsVerified={handleIsVerified}/>
            <VerificationCardTwo verified={isVerified}/>
            <VerificationCardThree hostname={hostname} verified={isVerified} setIsVerificationSuccess={setIsVerificationSuccess} setverificationId={setverificationId}/>
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

