import Image from "next/image";
import styles from "../styles/PortalInfo.module.css";

export default function PortalInfo() {
    return(
        <div className={styles.portal__info}>
            <div className={styles.employee__portal__card}>
                        <div className={styles.employee__portal__welcome__info}>
                            <p className={styles.portal__welcome_msg}>Welcome to your Goldman Sachs homepage!</p>
                            <p className={styles.portal__welcome__info}>You can now sign the necessary documents to open, close,<br/> and maintain accounts</p>
                        </div>
                        
                        <div className={styles.portal__nav__buttons}>
                            <button className={styles.portal_buttons}>Sign Documents <span>(2)</span></button>
                        </div>
              </div>
              <div className={styles.logo}>
                    <Image src="/logo_goldman.png" width={64} height={64} />
               </div>
        </div>
    )
}