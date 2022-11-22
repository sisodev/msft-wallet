import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import NavigationLink from "./NavigationLink";

const navigationRoutes = ["Mission", "Team", "Resources", "Alumini"];
 
export default function Navbar() {
  const router = useRouter();
  return (
    <nav className={styles.nav_container}>
      {navigationRoutes.map((singleRoute) => {
        return (
          <NavigationLink
            key={singleRoute}
            href={`/${singleRoute.toLowerCase()}`}
            text={singleRoute}
            router={router}
          />
        );
      })}
      <Image className="gear" src="/gear.png" width={30} height={30}/>
    </nav>
  );
}