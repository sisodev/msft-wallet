import styles from "../styles/RadioGroups.module.css";


export default function RadioGroups({label, value, category}) {
    return(
        <div className={styles.radio}>
            <label className={styles.radio__label} htmlFor="myRadio1">{label}</label>
            <input className={styles.radio__input} value={value} type="radio" name={category} id="myRadio1" />
        </div>
    )
}