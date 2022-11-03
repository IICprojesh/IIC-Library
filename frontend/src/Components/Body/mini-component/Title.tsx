import styles from "./Title.module.css";
export default function Title(props: { text: string }) {
  return (
    <>
      <p className={styles.text}>{props.text}</p>
    </>
  )
}
