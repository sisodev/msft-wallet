import Image from "next/image";
import styles from "../styles/VerificationCardTwo.module.css";

export default function VerificationCardTwo({verified}) {
    return(
        <div className={`${styles.verification__card__container} ${verified ? "" :  styles.card__blur}`}>
            <div className={styles.step__number}><h3>2</h3></div>
            <div className={styles.verification__explanation}>
                <div className={styles.verification__head}>
                    <h2>Confirm you have</h2>
                    <h2>your True Identity</h2>
                    <h2>card</h2>
                </div>
                <div className={styles.step__desc}>
                    <p>If this looks familiar, you are ready</p>
                    <p>to continue to step three.</p>
                </div>
            </div>
            <div className={styles.verification__card}>
                <Image src="/true-id-card.png" width={200} height={100} alt="true-id-card" />
            </div>
        </div>
    )
}