import React from "react";
import styles from "../styles/index.module.css";

const Header = () => {
  return (
    <>
      <h3>StoryLand</h3>
      <p>Be part of your own story, a new interactive learning method for children that's engaging. </p>
      <img src="/avatar.png" className={styles.icon} />
    </>
  );
};

export default Header;