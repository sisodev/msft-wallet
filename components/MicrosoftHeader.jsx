import Image from "next/image"
import styles from "../styles/MicrosoftHeader.module.css"

export default function MicrosoftHeader() {
    return(
        <div className={styles.header__container}>
            <Image src="/Microsoft_logo.svg" alt="microsoft_logo" width={128} height={128} />
        </div>
    )
}