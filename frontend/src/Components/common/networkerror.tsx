import { toast } from "react-toastify";
import styles from "./networkerror.module.css";
import { useEffect } from "react";

export default function NetworkError() {
  useEffect(() => {
    toast.error("OOPS!!! Network Gone");
  }, []);
  return (
    
    <div className={styles.body}>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    
  );
}
