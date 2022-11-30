import Image from "next/image"
import Link from 'next/link'
import styles from "../styles/MicrosoftHeader.module.css"

export default function MicrosoftHeader() {
    return(
        <div className={styles.header__container}>
            <Link href="/landing"><Image src="/Microsoft_logo.svg" alt="microsoft_logo" width={128} height={128} /></Link>
        </div>
    )
}