import styles from "../styles/WelcomeForm.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useAppContext } from "../store/AppContext";

export default function WelcomeForm() {
    const [username, setUserName] = useState({firstname: "Matthew", lastname: "Michael"})
    const [disable, setDisable] = useState(false)
    const router = useRouter();

    const {setFullname} = useAppContext()

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(`are we setting name`)
        setUserName(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        setFullname(`${username.firstname} ${username.lastname}`)
    }, [])

    useEffect(() => {
        setFullname(`${username.firstname} ${username.lastname}`)
    }, [username])

    const handleSubmit = () => {
        setDisable(true)
        router.push({
            pathname: '/verification',
        }, '/verification');
    }

    return(
        <div className={styles.form__container}>
            <div className={styles.form__instructions}>
                <h1 className={styles.heading}> Welcome to the <br/> GoldmanSachs Team!</h1>
                <br/>
                <h3>We are excited to have you onboard</h3>
                <br/>
                <h3>This online process will help set you up for success.</h3>
                <h3>We will walk you through</h3>
                <br/>
                <ul className={styles.instructions}>
                    <li>1. Accessing the employee poral</li>
                    <li>2. Getting your verified employee credential</li>
                    <li>3. Ordering your work equipment</li>
                </ul>
                <br/>
                <h3>Please enter your name and we will get started</h3>
            </div>
            <div className={styles.form_form}>
                <div className={styles.form__group}>
                    <label htmlFor="">First Name:</label>
                    <input type="text" name="firstname" value={username.firstname} onChange={handleChange} className={styles.form__control} required />
                </div>
                <br/>
                <div className={styles.form__group}>
                    <label htmlFor="">Last Name:</label>
                    <input value={username.lastname} name="lastname" onChange={handleChange} type="text" className={styles.form__control} required />
                </div>
                <button disabled={disable} onClick={handleSubmit} className={`${styles.button} ${styles.form__button}`}>Next &rarr;</button>
            </div>
        </div>
    )
}