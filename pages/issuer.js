import { withRouter } from "next/router"
import IssuerForm from "../components/IssuerForm"
import { useAppContext } from "../store/AppContext"
import styles from "../styles/Issuer.module.css"

function Issuer({hostname}) {

    const {fullname} = useAppContext()

    return(
        <div className={styles.issuer__container}>
            <div className={styles.issuer__header}>
                <p>Hi {fullname.indexOf(" ")!==-1? fullname.split(" ")[0] : fullname},</p>
                <p>tell us a little bit about yourself</p>
            </div>
            <p className={styles.issuer__form__title}>Enter the details in the required fields below</p>
            <div className={styles.issuer__form__container}>
                <IssuerForm host={hostname}/>
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