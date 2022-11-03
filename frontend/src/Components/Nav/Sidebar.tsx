import Navitems from './mini-component/Navitems';
import styles from './Sidebar.module.css'
import logo from './iiconly.png'
import avatar from "./avatar.png"

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div>
        <div >
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <ul className={styles.navitems}>
          <li className={styles.listitems}><Navitems link="/" icon="dashboard" text="Dashboard" /></li>
          <li className={styles.listitems}><Navitems link="/Books" icon="books" text="Books" /></li>
          <li className={styles.listitems}><Navitems link="/Students" icon="student" text="Student" /></li>
        </ul></div>
      <div className={styles.navfooter}>
        <div className={styles.footercontains}>
          
          <img src='https://thispersondoesnotexist.com/image' className={styles.avatar} />
          <h4>Librarian Mam</h4>
          <div className={styles.hr}></div>
          <li className={styles.footeritems}><Navitems link="/settings" icon="setting" text="" /></li>
          
        </div>

        <hr style={{ width: '100%' }} />
        <p className={styles.version}>Development Version 1.1.0</p>

      </div>


    </div>

  )
}


