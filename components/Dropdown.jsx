import { useState } from "react";
import styles from "../styles/Dropdown.module.css";

const options = [
    {label: 'U.S.', value: 'U.S.'},
    {label: 'U.K.', value: 'U.K.'},
    {label: 'Ireland', value: 'Ireland'},
]

export default function Dropdown() {

    const [claims, setClaims] = useState({})

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setClaims(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(`${JSON.stringify(claims,null,2)}`)
    }

    return(
        <>
            {/* <div className={styles.select__wrapper}>
                <select name="domicile" onChange={changeHandler} className={styles.menu__select}>
                    {options.map((opt, index) => <option key={index} value={opt.value}>{opt.label}</option>)}
                </select>
            </div>
            <p>We are in  {`${JSON.stringify(claims)}`}</p> */}
            <div className={styles.dropdown__wrapper}>
                <div className={styles.dropdown}>
                    <input type="text" className={styles.textbox} placeholder="Select Domicile" readOnly/>
                    <div className={styles.option}>
                        {
                            options.map((opt,index) => <div key={index}>{opt.value}</div>)
                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}