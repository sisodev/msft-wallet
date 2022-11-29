import Image from "next/image";
import styles from "../styles/VerificationCardTwo.module.css";

export default function VerificationCardTwo({verified}) {
    return(
        <div className={`${styles.verification__card__container} ${verified ? "" :  styles.card__blur}`}>
            <div className={styles.step__number}><h3>2</h3></div>
            <div className={styles.verification__explanation}>
                <div className={styles.verification__head}>
                    <h2>Confirm you have your Microsoft</h2>
                    <h2>Treasury credential</h2>
                </div>
                <div className={styles.step__desc}>
                    <p>If this looks familiar, you are ready to continue to step 3</p>
                </div>
            </div>
            <div className={styles.verification__card}>
                <Image src="/true-id-card.png" width={200} height={100} alt="true-id-card" />
            </div>
        </div>
    )
}