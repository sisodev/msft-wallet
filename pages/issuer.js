import { withRouter } from "next/router"
import IssuerForm from "../components/IssuerForm"
import styles from "../styles/Issuer.module.css"

function Issuer({router, hostname}) {
    const {name} = router.query
    return(
        <div className={styles.issuer__container}>
            <div className={styles.issuer__header}>
                <p>Hi {name},</p>
                <p>tell us a little bit about yourself</p>
            </div>
            <p className={styles.issuer__form__title}>Enter the details in the required fields below</p>
            <div className={styles.issuer__form__container}>
                <IssuerForm name={name} host={hostname}/>
            </div>
        </div>
    )

}

export async function getServerSideProps(context){
    return {
      props: {
        hostname: context.req.headers.host
      }
    }
}


export default withRouter(Issuer)