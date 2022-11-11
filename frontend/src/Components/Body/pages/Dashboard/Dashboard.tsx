import Card from "../../mini-component/Dashboardcard";

import Issuebook from "../../mini-component/Issuebook/Issuebook";
import styles from "./Dashboard.module.css";
import { Title } from "../../../common/title/Title";

export default function Dashboard() {
  return (
    <>
      <Title title="Dashboard" />
      <div className={styles.cards}>
        <Card 
          title="200"
          subtitle="Total Books"
          icon="Books"
        />
        <Card
          title="80"
          subtitle="Books Borrowed"
          icon="bookupload"
        />
        <Card
          title="20"
          subtitle="Expired Books"
          icon="booksexpire"
        />
        <Card
          title="300"
          subtitle="Total Students"
          icon="students"
        />
        
      </div>
      <div className={styles.middlecontainer}>
        <Issuebook />
      </div>
    </>
  );
}
