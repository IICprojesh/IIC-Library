import Card from "../../mini-component/Dashboardcard";
import Issuebook from "../../mini-component/Issuebook/Issuebook";
import Expire from "../../mini-component/Expire/Expire";
import Title from "../../mini-component/Title";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div>
      <Title text="Dashboard" />
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
          title="Total Students"
          subtitle="300 Students Registered in Library"
          icon="students"
        />
      </div>
      <div className={styles.middlecontainer}>
        <Issuebook />
        <Expire />
      </div>
    </div>
  );
}
