import Navitems from "./mini-component/Navitems";
import styles from "./Sidebar.module.css";
import logo from "./iiconly.png";
import { Link } from "react-router-dom";
import { Icon } from "../common/icons/Icon";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetch";

export default function Sidebar() {
  const [setting, setSetting] = useState<any>(null);

  useEffect(() => {
    fetchData("settings").then((data: any) => {
      setSetting(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <div>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <ul className={styles.navitems}>
          <Navitems link="/" icon="dashboard" text="Dashboard" />
          <Navitems link="/Books" icon="books" text="Books" />
          <Navitems link="/Issue" icon="IssueBook" text="Issues" />
          <Navitems link="/Students" icon="student" text="Student" />
        </ul>
      </div>
      <div className={styles.navfooter}>
        <div className={styles.footercontains}>
          <img
            src={setting?.avatar ?? `https://thispersondoesnotexist.com/image`}
            className={styles.avatar}
            style={{height:45, width:55}}
            alt="profile"
          />
          <h4>
            {setting?.firstName} {setting?.lastName}
          </h4>
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
        <p className={styles.version}>
          Development Version {process.env.REACT_APP_VERSION}
        </p>
      </div>
    </div>
  );
}
