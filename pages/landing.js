import Image from "next/image"
import WelcomeForm from "../components/WelcomeForm"
import styles from "../styles/Landing.module.css"

export default function Landing() {
    return(
        <div className={styles.landing__container}>
            <WelcomeForm/>
            <div className={styles.landing__image}>
                <Image src="/banner_image.jpg" width={1000} height={600} />
            </div>
        </div>
    )
}