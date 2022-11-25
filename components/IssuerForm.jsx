import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "../styles/IssuerForm.module.css"
import Modal from "./Modal"

export default function IssuerForm({name : fullname, host}) {

    const router = useRouter()

    const [claims, setClaims] = useState(null)
    const [issuanceResponse, setIssuanceResponse] = useState(null)
    const [show,setShow] = useState(false)
    const [modalMessage, setModalMessage] = useState("Verifying")

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setClaims(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const modalCloseHandler = () => {
        // setShow(false)
        //console.log(JSON.stringify(issuanceResponse))
        //const issuanceResponse = {"requestId":"13b8891f-3811-4d3e-8d78-7ccc9f340209","url":"openid-vc://?request_uri=https://beta.did.msidentity.com/v1.0/tenants/fe83c546-e3ca-4d22-9fbf-10cb709424b1/verifiableCredentials/issuanceRequests/13b8891f-3811-4d3e-8d78-7ccc9f340209","expiry":1669264671,"pin":"1655"}
        // console.log("navigating...")
        const {url, pin} = issuanceResponse;
        console.log(issuanceResponse)
        router.push({
            pathname: '/issuance/save',
            query: {url, pin, fullname}
        }, "/issuance/save")
    }

    const submitHandler = async () => {
        if(claims.fname && claims.lname && claims.dateOfBirth && claims.passportNumber) {

            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify({claims,hostname: host}),
                headers: {
                'Content-Type': 'application/json',
                }
            };
            try{
                setShow(true)
                const response = await fetch('api/issuer/issuance-request',fetchOptions)
                const data = await response.json()
                console.log("received response")
                console.log(data)
                setIssuanceResponse(data)
                console.log(issuanceResponse)
                setModalMessage("Verification Complete")
            }catch(e) {
                setModalMessage("Something went wrong")
                console.error(e)
            } 
        }
    }

    return(
        <>
        <div className={styles.issuer__form__wrapper}>
            <div className={styles.issuer__form_field__groups}>
                <div className={styles.issuer__form__name__fields}>
                    <div className={styles.form__group}>
                        <label htmlFor="fname"><p>First Name*</p></label>
                        <input onChange={changeHandler} type="text" name="fname" id="fname" required/>
                    </div>
                    <div className={styles.form__group}>
                        <label htmlFor="lname"><p>Last Name*</p></label>
                        <input onChange={changeHandler} type="text" name="lname" id="lname" required/>
                    </div>
                </div>
                <div className={styles.issuer__form__dob__photo}>
                    <div className={styles.issuer__form__dob__passport}>
                        <div className={styles.form__group}>
                            <label htmlFor="dateOfBirth"><p>Date of birth*</p></label>
                            <input onChange={changeHandler} type="text" name="dateOfBirth" id="dateOfBirth" required/>
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor="passportNumber"><p>Passport number*</p></label>
                            <input onChange={changeHandler} type="text" name="passportNumber" id="passportNumber" required/>
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor="country"><p>Country*</p></label>
                            <input onChange={changeHandler} type="text" name="country" id="country" required/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.issuer__action__btn}>
                <button className={styles.issuer_btn}> Go Back</button>
                <button className={styles.issuer_btn} onClick={submitHandler}> Submit</button>
            </div>

        </div>
            <Modal title={modalMessage} onClose={modalCloseHandler} show={show}>
               <Image src="/verify_md_fast.gif" alt="progress" width={250} height={250} />
            </Modal>
        </>
    )
}