import React from "react";
import styles from "../styles/index.module.css";

const Header = () => {
  return (
    <React.Fragment>
    <p className={styles.quote}>"Be The Main Character In Your Own Story!"</p>
    <img src="/avatar.png" className={styles.icon} />
  </React.Fragment>
  );
};

export default Header;