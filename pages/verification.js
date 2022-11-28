import Image from "next/image";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import VerificationCardOne from "../components/VerificationCardOne";
import VerificationCardThree from "../components/VerificationCardThree";
import VerificationCardTwo from "../components/VerificationCardTwo";
import VerificationSuccess from "../components/VerificationSuccess";
import styles from "../styles/Verification.module.css"
// import {getSession} from  "../lib/get-session";

function Verification({router, hostname}) {
    const [isVerified, setIsVerified] = useState(false)
    const [isVerificationSuccess, setIsVerifictionSuccess] = useState(false)
    const name = router.query.name ? router.query.name.split(" ")[0] : ""

    const handleIsVerified = () =>{
        setIsVerified(!isVerified)
    }

    const setVerificationStatus = (status) => {
        console.log("Verification success")
        if(status.match("Verification complete") ){
            setIsVerifictionSuccess(true)
        }
        
    }

    // useEffect(() => {
    //     console.log(verification_state)
    // }, [verification_state])


    return(
        <>
        <div className={styles.verification__container}>
            <div className={styles.verification_banner}>
                <Image src="/verification_header_banner.png" lat="banner" width={1500} height={190} />
            </div>
            <div className={styles.verification__welcome}>
                <h2>Hi {name}.</h2>
                <h2>Lets verify your identity to access</h2>
                <h2>the Goldman Sachs portal</h2>
            </div>
        </div>
        <div className={styles.verification__cards}>
            <VerificationCardOne name={ router.query.name ? router.query.name : "John Doe"} verified={isVerified} changeIsVerified={handleIsVerified}/>
            <VerificationCardTwo verified={isVerified}/>
            <VerificationCardThree verified={isVerified} hostname={hostname} handlVerificationStatus={setVerificationStatus}/>
        </div>
        {isVerificationSuccess ? <VerificationSuccess/> : ""}
        </>
    )
}


export async function getServerSideProps(context) {
    const {req,res} = context
    // const session = await getSession(req,res)
    // session.message = session.message ? session.message : "nothing here.."
    // console.log(`the session message is ${session.message}`)
    return {
        props: {
            // verification_state : session.message,
            hostname: context.req.headers.host
        }
    }
}


export default withRouter(Verification);

