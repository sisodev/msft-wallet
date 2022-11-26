import { withRouter } from "next/router"
import IssuerForm from "../components/IssuerForm"
import styles from "../styles/Issuer.module.css"

function Issuer({router, hostname}) {
    const {name} = router.query
    return(
        <div className={styles.issuer__container}>
            <div className={styles.issuer__header}>
                <h2>Microsoft Treasury</h2>
                <p>Please tell us a little bit about yourself</p>
                <h3>Please enter Details here</h3>
            </div>
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