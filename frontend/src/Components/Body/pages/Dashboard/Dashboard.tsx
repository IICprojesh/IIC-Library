import Card from "../../mini-component/Dashboardcard";

import Issuebook from "../../mini-component/Issuebook/Issuebook";
import styles from "./Dashboard.module.css";
import { Title } from "../../../common/title/Title";
import { fetchData } from "../../../../utils/fetch";
import React from "react";

interface DashboardDataType {
  totalExpired: number;
  totalStudents: number;
  totalBooks: number;
  totalBorrowed: number;
}

export default function Dashboard() {
  const [data, setData] = React.useState<DashboardDataType | null>(null);

  React.useEffect(() => {
    fetchData("dashboard").then((data: DashboardDataType) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <Title title="Dashboard" />
      <div className={styles.cards}>
        <Card
          title={data?.totalBooks ?? 0}
          color="green"
          subtitle="Total Books"
          icon="Books"
        />
        <Card
          color="blue"
          title={data?.totalBorrowed ?? 0}
          subtitle="Books Issued"
          icon="bookupload"
        />
        <Card
          title={data?.totalExpired ?? 0}
          color="red"
          subtitle="Expired Books"
          icon="booksexpire"
        />
        <Card
          title={data?.totalStudents ?? 0}
          color="orange"
          subtitle="Total Students"
          icon="students"
        />
      </div>
      <div className={styles.middlecontainer}>
        <Issuebook />
        <div className={styles.ChartContainer}></div>
      </div>
    </>
  );
}
