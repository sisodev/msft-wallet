import styles from "../styles/Modal.module.css"

export default function Modal(props) {
    if(!props.show) {
        return null
    }

    return(
        <div className={`${props.show ? 'modal__show': ''}`}>
            <div className={styles.modal__content}>
                <div className={styles.modal__header}>
                    <h4 className={styles.modal__title}>{props.title}</h4>
                </div>
                <div className={styles.modal__body}>
                    {props.children}
                </div>
                <div className={styles.modal__footer}>
                   {props.title ==="Verification Complete" ?  <button onClick={props.onClose} className={styles.modal__button}>Close</button> : "" } 
                </div>
            </div>
        </div>
    )
}