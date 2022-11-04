import styles from "./Dashboardcard.module.css";
import { AiOutlineFileAdd, AiOutlineBook } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";

const icons = {
  books: AiOutlineBook,
  add: AiOutlineFileAdd,
  students: HiOutlineUsers,
};

export default function Card(props: {
  title: string;
  subtitle: string;
  icon: keyof typeof icons;
}) {
  const Icon = icons[props.icon];
  return (
    <div className={styles.Container}>
      <div className={styles.carditems}>
        <p className={styles.title}>{props.title}</p>
        <Icon className={styles.icon} />
      </div>
      <p className={styles.subtitle}>{props.subtitle}</p>
    </div>
  );
}
