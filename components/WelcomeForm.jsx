import styles from "../styles/WelcomeForm.module.css"
import { useState } from "react"
import { useRouter } from "next/router";

export default function WelcomeForm() {
    const [fullname, setName] = useState({firstname: "Matthew", lastname: "Michael"})
    const router = useRouter();

    const handleChange = e => {
        const { name, value } = e.target;
        setName(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        router.push({
            pathname: '/verification',
            query: { name: `${fullname.firstname} ${fullname.lastname}` }
        }, '/verification');
    }

    return(
        <div className={styles.form__container}>
            <div className={styles.form__instructions}>
                <h1 className={styles.heading}> Welcome to the <br/> GoldmanSachs Team!</h1>
                <br/>
                <h3>We're excited to have you onboard</h3>
                <br/>
                <h3>This online process will help set you up for success.</h3>
                <h3>We'll walk you through</h3>
                <br/>
                <ul className={styles.instructions}>
                    <li>1. Accessing the employee poral</li>
                    <li>2. Getting your verified employee credential</li>
                    <li>3. Ordering your work equipment</li>
                </ul>
                <br/>
                <h3>Please enter your name and we'll get started</h3>
            </div>
            <div className={styles.form_form}>
                <div className={styles.form__group}>
                    <label htmlFor="">First Name:</label>
                    <input type="text" name="firstname" value={fullname.firstname} onChange={handleChange} className={styles.form__control} required />
                </div>
                <br/>
                <div className={styles.form__group}>
                    <label htmlFor="">Last Name:</label>
                    <input value={fullname.lastname} name="lastname" onChange={handleChange} type="text" className={styles.form__control} required />
                </div>
                <button onClick={handleSubmit} className={`${styles.button} ${styles.form__button}`}>Next &rarr;</button>
            </div>
        </div>
    )
}