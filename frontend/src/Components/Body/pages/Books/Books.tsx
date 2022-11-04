import Title from "../../mini-component/Title";
import styles from "./Books.module.css";

export default function Books() {
  return (
    <>
      <Title text="Books" />
      <div className={styles.container}></div>
    </>
  );
}
