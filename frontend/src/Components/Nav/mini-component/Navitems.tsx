import { NavLink } from "react-router-dom";
import { CustomIconType, Icon } from "../../common/icons/Icon";
import styles from "./Navitems.module.css";

export default function Navitems(props: {
  icon: CustomIconType;
  text: string;
  link: string;
}) {
  return (
    <div>
      <NavLink
        to={props.link}
        className={({ isActive }) => {
          let str = `${styles.Navitems}`;
          if (isActive) str += ` ${styles.NavItemsActive}`;
          return str;
        }}
      >
        <Icon icon={props.icon} className={styles.icon} />
        <span className="text">{props.text}</span>
      </NavLink>
    </div>
  );
}
