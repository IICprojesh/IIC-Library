import { toast } from "react-toastify";
import styles from "./networkerror.module.css";
import { useEffect } from "react";

export default function NetworkError() {
  useEffect(() => {
    toast.error("OOPS!!! Network Gone");
  }, []);
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.head}>Connecting to server</h3>
        <div className={`${styles.component} ${styles.PC}`}>
          <div className={styles.flare}></div>
        </div>
        <div className={`${styles.component} ${styles.signals}`}>
          <div className={`${styles.first} ${styles.dot}`}></div>
          <div className={`${styles.second} ${styles.dot}`}></div>
          <div className={`${styles.third} ${styles.dot}`}></div>
        </div>
        <div className={`${styles.component} ${styles.server}`}>
          <div className={styles.slot}></div>
          <div className={styles.slot}></div>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>
      </div>
    </>
  );
}
