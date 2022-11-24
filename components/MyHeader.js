import Image from "next/image";
import Navbar from "./Navbar";
import styles from "../styles/MyHeader.module.css";
import { useRouter } from "next/router";

export default function MyHeader() {
    const router = useRouter()
    if(router.pathname.indexOf("issuance") !== -1 || router.pathname === "/issuer") {
        return null;
    }
    return(
        <div className={styles.header__container}>
            <div className={styles.header_logo}>
                 <Image src="/office-building.png" width={50} height={50}/>
                 <h3>Employee Onboarding</h3>
            </div>
            <Navbar />
        </div>
    )
}