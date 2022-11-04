import styles from "./Expire.module.css";

function Boxtitle(props: any) {
  const { title } = props;
  return (
    <>
      <h3 className={styles.boxtitle}>{title}</h3>
      <div className={styles.hr}></div>
    </>
  );
}

export default function Expire() {
  return (
    <div className={styles.container}>
      <Boxtitle title="Expired Borrow Date" />
    </div>
  );
}
