import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/VerificationSuccess.module.css";
import { useAppContext } from "../store/AppContext";

export default function VerificationSuccess({verificationId}) {


    const router = useRouter()

    // const {verificationId} = useAppContext();
    console.log(`verification id fetched from verification ${verificationId}`)

    const goForward = () => {
        console.log(`verification id fetched from verification ${verificationId}`)
        router.push({
            pathname: '/employee',
            query: { verificationId }
        });
    }

    const returnHome = () => {
        router.push("/landing")
    }


    return(
        <div className={styles.verification__success__wrapper}>
            <div className={styles.verification__success__container}>
                <div className={styles.verification__success__header}>
                    <h2>Finishing up</h2>
                    <p>We are finalizing some details before taking you to your privilege hub</p>
                </div>
                <div className={styles.verification__success_img}>
                    <Image src="/checked.png" alt="success" width={150} height={150} />
                </div>
                <div className={styles.verification__success__action__btn}>
                    <button className={styles.verification__success__forward} onClick={goForward}>Continue</button>
                    <button className={styles.verification__success__return} onClick={returnHome}>Return home</button>
                </div>
            </div>
        </div>
    )
}