import { withRouter } from "next/router"
import IssuerForm from "../components/IssuerForm"
import styles from "../styles/Issuer.module.css"

function Issuer({router}) {
    return(
        <div className={styles.issuer__container}>
            <div className={styles.issuer__header}>
                <h2>Microsoft Treasury</h2>
                <p>Please tell us a little bit about yourself</p>
                <h3>Please enter Details here</h3>
            </div>
            <div className={styles.issuer__form__container}>
                <IssuerForm/>
            </div>
        </div>
    )

}

export default withRouter(Issuer)