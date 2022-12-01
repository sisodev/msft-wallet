import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/VerificationCardOne.module.css";

export default function VerificationCardOne({verified, changeIsVerified}) {
    
    const router = useRouter();

    const clickHandler = () => {
        router.push({
            pathname: "/issuer",
        }, '/issuer')
    }

    return(
        <div className={styles.verification__card__container}>
            <div className={styles.step__number}><h3>1</h3></div>
            <div className={styles.verification__head}>
                <h2>Verify with Microsoft Treasury</h2>
            </div>
            <div className={styles.step__desc}>
                <p>you will walk you through a process to submit the required information to get a credential Once done, you will be able to leverage that credential to use your privileges at Goldman Sachs.</p>
            </div>
            <div className={styles.verification__button}>
                <button disabled={verified} onClick={clickHandler}>{verified ? 
                <div className={styles.verified__btn__message}><Image src="/check-mark.png" alt="check mark" width={25} height={25} />Verified </div>
                : "Get My Credential"}</button>
            </div>
            <div className={styles.verified__button} >
                <button onClick={changeIsVerified}>{verified ? "" : <p>I have been verified </p>}</button>
            </div>
        </div>
    )
}


