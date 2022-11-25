import Image from "next/image";
import { withRouter } from "next/router";
import { useState } from "react";
import VerificationCardOne from "../components/VerificationCardOne";
import VerificationCardThree from "../components/VerificationCardThree";
import VerificationCardTwo from "../components/VerificationCardTwo";
import styles from "../styles/Verification.module.css"

function Verification({router, hostname}) {
    const [isVerified, setIsVerified] = useState(false)
    const name = router.query.name ? router.query.name.split(" ")[0] : ""

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
                <h2>Hi {name}.</h2>
                <h2>Lets verify your identity to access</h2>
                <h2>the Goldman Sachs portal</h2>
            </div>
        </div>
        <div className={styles.verification__cards}>
            <VerificationCardOne name={ router.query.name ? router.query.name : "John Doe"} verified={isVerified} changeIsVerified={handleIsVerified}/>
            <VerificationCardTwo verified={isVerified}/>
            <VerificationCardThree verified={isVerified} hostname={hostname}/>
        </div>
        </>
    )
}

export async function getServerSideProps(context){
    return {
      props: {
        hostname: context.req.headers.host
      }
    }
}

export default withRouter(Verification);

