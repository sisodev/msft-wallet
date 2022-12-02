import Image from "next/image";
import { withRouter } from "next/router";
import styles from "../styles/Employee.module.css";


function Employee({userData,photo}){
    if(!userData) {
        return (<h1>Loading...</h1>)
    }

    return(
        <div className={styles.employee__page__wrapper}>
            <div className={styles.employee__welcome__header}>
                <div className={styles.verification_banner}>
                    <Image src="/verification_header_banner.png" lat="banner" width={1500} height={190} />
                </div>
                <div className={styles.employee__verification__status}>
                    <Image src="/check-mark.png" width={25} height={25} /> 
                    <p>Validated !</p>
                </div>
                <div className={styles.employee__credential__status}>
                    <p>your credentials have now been validated in accordance with Goldman</p>
                    <p>Sachs Know-Your-Customer Policies</p>
                </div>
            </div>
            <div className={styles.employee__info__wrapper}>
                <div className={styles.employee__info__sidenav}>
                    <div className={styles.employee__info__card}>
                        <h3 className={styles.employee__info__title}>My Details</h3>
                        <div className={styles.employee__details}>
                            <div className={styles.employee__data}>
                                <h3>Name</h3>
                                <p>{userData.firstName}</p>
                            </div>
                            <div className={styles.employee__data}>
                                <h3>Date of birth</h3>
                                <p>{userData.dateOfBirth}</p>
                            </div>
                            <div className={styles.employee__data}>
                                <h3>Domicile</h3>
                                <p>{userData.domicile}</p>
                            </div>
                            <div className={styles.employee__data}>
                                <h3>Email</h3>
                                <p>{userData.emailAddress}</p>
                            </div>
                            <div className={styles.employee__data}>
                                <h3>Privilege status</h3>
                                {userData.privilegedSigner === "Yes" ? <p>Privileged Signer</p> : <p>Signer</p>}
                            </div>
                            <div className={styles.employee__data}>
                                <h3>Copy of passport photo page</h3>
                                <Image src={photo} width={200} height={200} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.employee__portal__info}>
                    <div className={styles.logo}>
                        <Image src="/logo_goldman.png" width={250} height={250} />
                    </div>
                    <div className={styles.employee__portal__card}>
                        <div className={styles.employee__portal__welcome__info}>
                            <p className={styles.portal__welcome_msg}>Welcome to your Goldman Sachs homepage!</p>
                            <p className={styles.portal__welcome__info}>You can now sign the necessary documents to open, close,<br/> and maintain accounts</p>
                        </div>
                        <div className={styles.portal__nav__buttons}>
                            <button className={styles.portal_buttons}>Sign Documents <span>(2)</span></button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Employee)


export async function getServerSideProps(context) {
    console.log(`the query in context is ${JSON.stringify(context.query,null,2)}`)
    const {verificationId} = context.query
    const fetchUserData = async () => {
        console.log(`the verification id is ${verificationId}`)
        const resp = await fetch(`https://${context.req.headers.host}/api/userdetails?state=${verificationId}`)
        const data = await resp.json()
        console.log(`user : ${JSON.stringify(data, null, 2)}`)
        return data
    }

    const userData = await fetchUserData(verificationId)
    console.log(`userData:: ${JSON.stringify(userData,null,2)}`)

    return {
        props: {
            userData,
            photo: `/${userData.session_key}.jpg`
        }
    }
}