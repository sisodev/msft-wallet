// import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/VerificationCardThree.module.css"


export default function VerificationCardThree() {
    return(
        <div className={styles.verification__card__container}>
            <div className={styles.step__number}>
                <div className={styles.number_content}>
                    <h3>3</h3>
                </div>
            </div>
            <div className={styles.verification__explanation}>
                <div className={styles.verification__head}>
                    <h2>Access the</h2>
                    <h2>personalized</h2>
                    <h2>employee portal</h2>
                </div>
                <div className={styles.step__desc}>
                    <p>You will need a Verifiable</p>
                    <p>Credential and Microsoft</p>
                    <p>Authenticator to access.</p>
                </div>
            </div>
            <div className={styles.verification__button}>
                <button><FontAwesomeIcon icon={faFileSignature} /> Access Personalized portal</button>
            </div>
    </div>
    )
}