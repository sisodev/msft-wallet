import Image from "next/image";
import { withRouter } from "next/router";
import styles from "../styles/Verification.module.css"

function Verification({router}) {
    const name = router.query.name.split(" ")[0]
    return(
        <div className={styles.verification__container}>
            <div className={styles.verification__welcome}>
                <h2>Hi {name}.</h2>
                <h2>Lets verify your identity to access</h2>
                <h2>the employee portal</h2>
            </div>
            <div className={styles.identity__steps}>

            </div>
        </div>
    )
}

export default withRouter(Verification);

