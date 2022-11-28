import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/VerificationSuccess.module.css";

export default function VerificationSuccess() {
    const router = useRouter()

    const goForward = () => {
        router.push("/employee")
    }

    const returnHome = () => {
        router.push("/landing")
    }
    return(
        <div className={styles.verification__success__wrapper}>
            <div className={styles.verification__success__container}>
                <div className={styles.verification__success__header}>
                    <h2>Finishing up onboarding</h2>
                    <p>We are finalizing some details before taking you to your</p>
                    <p>personalized employee portal</p>
                </div>
                <div className={styles.verification__success_img}>
                    <Image src="/checked.png" alt="success" width={150} height={150} />
                </div>
                <div className={styles.verification__success__action__btn}>
                    <button className={styles.verification__success__forward} onClick={goForward}>Continue onboarding</button>
                    <button className={styles.verification__success__return} onClick={returnHome}>Return home</button>
                </div>
            </div>
        </div>
    )
}