import React from "react";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <img src="/StoryLandLogo.png" className={styles.Navbar} />
      {/* <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>Home</li>
        <li className={styles.navbarItem}>About</li>
        <li className={styles.navbarItem}>Contact</li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
