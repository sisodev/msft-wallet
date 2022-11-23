import { useEffect, useState } from "react"
import styles from "../styles/IssuerForm.module.css"

export default function IssuerForm() {

    

    const [claims, setClaims] = useState(null)

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setClaims(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(claims)
    }

    const submitHandler = async () => {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(claims),
            headers: {
            'Content-Type': 'application/json',
            }
        };
        console.log(claims)
        const response = await fetch('https://ms-entra-demo.azuresites.net/api/issuer/issuance-request',fetchOptions)
        const data = await response.json()
        console.log(data)
    }

    return(
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
    )
}