import Navitems from "./mini-component/Navitems";
import styles from "./Sidebar.module.css";
import logo from "./iiconly.png";
import { Link } from "react-router-dom";
import { Icon } from "../common/icons/Icon";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div>
        <div>
          
        <img src={logo} className={styles.logo} alt="logo" />
        {/* change to above code during production */}
          {/* <img src='https://nepal.gov.np/splash/nepal-govt.png' className={styles.logo} alt="logo" /> */}
        </div>
        <ul className={styles.navitems}>
          <Navitems link="/" icon="dashboard" text="Dashboard" />
          <Navitems link="/Books" icon="books" text="Books" />
          <Navitems link="/Students" icon="student" text="Student" />
        </ul>
      </div>
      <div className={styles.navfooter}>
        <div className={styles.footercontains}>
          <img
            src="https://thispersondoesnotexist.com/image"
            className={styles.avatar}
            alt="profile"
          />
          <h4>Librarian Mam</h4>
          <div className={styles.hr}></div>
          <li className={styles.footeritems}>
            <Link to="/settings">
              <Icon
                icon="setting"
                style={{
                  color: "white",
                  fontSize: "1.4rem",
                }}
              />
            </Link>
          </li>
        </div>

        <hr style={{ width: "100%" }} />
        <p className={styles.version}>Development Version 1.1.0</p>
      </div>
    </div>
  );
}
