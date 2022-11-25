import { useRouter } from "next/router";
import styles from "../styles/VerificationCardOne.module.css";

export default function VerificationCardOne({name, verified, changeIsVerified}) {
    
    const router = useRouter();

    const clickHandler = () => {
        router.push({
            pathname: "/issuer",
            query: {name}
        }, '/issuer')
    }

    return(
        <div className={styles.verification__card__container}>
            <div className={styles.step__number}><h3>1</h3></div>
            <div className={styles.verification__head}>
                <h2>Verify using the True</h2>
                <h2>Identity website</h2>
            </div>
            <div className={styles.step__desc}>
                <p>They will walk you through a</p>
                <p>process to verify your identity.</p>
                <p>Once done, you will come back</p>
                <p>here and continue to step two</p>
            </div>
            <div className={styles.verification__button}>
                <button disabled={verified} onClick={clickHandler}>{verified ? "Verified": "Verify with True Identity"}</button>
            </div>
            <div className={styles.verified__button} >
                <button onClick={changeIsVerified}>{verified ? "" : <p>I have been verified </p>}</button>
            </div>
        </div>
    )
}


