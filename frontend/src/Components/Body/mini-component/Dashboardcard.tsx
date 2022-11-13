import { CustomIconType, Icon } from "../../common/icons/Icon";
import styles from "./Dashboardcard.module.css";

export default function Card(props: any) {
  return (
    <>
      <div className={styles.ContainerSide} style={{backgroundColor:props.color}}> </div>
      <div className={styles.Container} style={props.style}>
          <div className={styles.iconContainer}>
            <Icon icon={props.icon} className={styles.icon} />
          </div>
          <div className={styles.carditems}>
            <p className={styles.subtitle}>{props.subtitle}</p>
            <p className={styles.title}>{props.title}</p>
          </div>
      </div>
    </>
  );
}
