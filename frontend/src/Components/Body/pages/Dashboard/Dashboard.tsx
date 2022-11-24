import Card from "../../mini-component/Dashboardcard";

import Issuebook from "../../mini-component/Issuebook/Issuebook";
import styles from "./Dashboard.module.css";
import { Title } from "../../../common/title/Title";
import { fetchData } from "../../../../utils/fetch";
import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >
      <Title title="Dashboard" />
      <motion.div
        className={styles.cards}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
      >
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
      </motion.div>
      <motion.div
        className={styles.middlecontainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
      >
        <Issuebook medium="collegeId" />
        <Issuebook medium="name" />
      </motion.div>
    </motion.div>
  );
}
