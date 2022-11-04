import { CustomIconType, Icon } from "../../common/icons/Icon";
import styles from "./Dashboardcard.module.css";

export default function Card(props: {
  title: string;
  subtitle: string;
  icon: CustomIconType;
}) {
  return (
    <div className={styles.Container}>
      <div className={styles.carditems}>
        <p className={styles.title}>{props.title}</p>
        <Icon icon={props.icon} className={styles.icon} />
      </div>
      <p className={styles.subtitle}>{props.subtitle}</p>
    </div>
  );
}
