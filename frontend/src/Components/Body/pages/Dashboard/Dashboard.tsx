import Card from "../../mini-component/Dashboardcard";

import Issuebook from "../../mini-component/Issuebook/Issuebook";
import Addstudents from "../../mini-component/Expire/Addstudent";
import styles from "./Dashboard.module.css";
import { Title } from "../../../common/title/Title";

export default function Dashboard() {
  return (
    <>
      <Title title="Dashboard" />
      <div className={styles.cards}>
        <Card
          title="Add New Book"
          subtitle="200 New Books Added In Library"
          icon="add"
        />
        <Card
          title="Total Borrowed"
          subtitle="80 Books were Borrowed"
          icon="bookOpen"
        />
        <Card
          title="Expired Borrow"
          subtitle="20 Expire Return/Renew Book"
          icon="students"
        />
        <Card
          title="Total Students"
          subtitle="300 Students Registered in Library"
          icon="students"
        />
        
      </div>
      <div className={styles.middlecontainer}>
        <Issuebook />
        <Addstudents />
      </div>
    </>
  );
}
