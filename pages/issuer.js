import { withRouter } from "next/router"
import styles from "../styles/Issuer.module.css"

function Issuer({router}) {
    return(
        <div className={styles.issuer__container}>
            <div className={styles.issuer__header}>
                <h1>Microsoft Treasury, {router.query.name}</h1>
            </div>
        </div>
    )

}

export default withRouter(Issuer)