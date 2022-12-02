import styles from "../styles/WelcomeForm.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useAppContext } from "../store/AppContext";



export default function WelcomeForm() {
    const [username, setUserName] = useState({firstname: "", lastname: ""})
    const [disable, setDisable] = useState(false)
    const router = useRouter();

    const {setFullname} = useAppContext()

    const handleChange = e => {
        const { name, value } = e.target;
        setUserName(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    useEffect(() => {
        setFullname(`${username.firstname} ${username.lastname}`)
    }, [])

    useEffect(() => {
        if(username.firstname === "" && username.lastname === ""){
            setDisable(true)
        }else{
            setDisable(false)
            setFullname(`${username.firstname} ${username.lastname}`)
        }
        
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
                <h1 className={styles.heading}>Create Your Treasury <br/> Verified ID</h1>
                <br/>
                <h3>This online process will result in the creation of</h3>
                <h3>your digital credential issued by Microsoft Treasury</h3>
                <br/>
                <br/>
                <h3>Please enter your name to get started.</h3>
            </div>
            <div className={styles.form_form}>
                <div className={styles.form__group}>
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" id="firstname" name="firstname" value={username.firstname} onChange={handleChange} className={styles.form__control} required />
                </div>
                <br/>
                <div className={styles.form__group}>
                    <label htmlFor="lastname">Last Name:</label>
                    <input value={username.lastname} id="lastname" name="lastname" onChange={handleChange} type="text" className={styles.form__control} required />
                </div>
                <button disabled={disable} onClick={handleSubmit} className={`${styles.button} ${styles.form__button}`}>Next &rarr;</button>
            </div>
        </div>
    )
}