import Link from "next/link";
import styles from "../styles/NavigationLink.module.css";

export default function NavigationLink({ href, text, router }) {
    const isActive = router.asPath === (href === "/home" ? "/" : href);
    return (
      <Link href={href === "/home" ? "/" : href} passHref legacyBehavior>
        <a
          href={href === "/home" ? "/" : href}
          className={`${isActive && styles.nav_item_active} ${styles.nav_item}`}
        >
          {text}
        </a>
      </Link>
    );
  }