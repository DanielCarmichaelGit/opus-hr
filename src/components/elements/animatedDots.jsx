import React from "react";
import styles from "../../css/components/elements/animatedDots.module.css"; // Ensure you create this CSS file

const AnimatedDots = () => {
  return (
    <span className={styles.AnimatedDots}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
};

export default AnimatedDots;
