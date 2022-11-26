import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/IssuanceSuccess.module.css";


export default function IssuanceSuccess({fullname = "John Doe"}) {

    const router = useRouter();
    const name  = fullname.split(" ")[0];
    const handleClick = () => {
        router.push({
            pathname: '/verification',
            query: name
        }, '/verification');
    }



    return(
        <div className={styles.issuance__success__card__container}>
            <div className={styles.issuance__success__message}>
                <h2>Successfully issued!</h2>
            </div>
            <div className={styles.issuance__success_info}>
                <p>You may now use your identity card to prove who you are to other</p>
                <p>parties.</p>
            </div>
            <div className={styles.issuance__success__image}>
                <Image src="/checked.png" alt="checked" width={100} height={100} />
            </div>
            <div className={styles.issuance__success__instructions}>
                <p>Once you have added your verifiable credential to your</p>
                <p>digital wallet, you may return to the portal.</p>
            </div>
            <div className={styles.issuance__return__button}>
                <button onClick={handleClick}>Return to Home page</button>
            </div>
        </div>
    )
}