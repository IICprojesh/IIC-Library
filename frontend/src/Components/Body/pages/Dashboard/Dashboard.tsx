import Card from "../../mini-component/Dashboardcard";

import Issuebook from "../../mini-component/Issuebook/Issuebook";
import styles from "./Dashboard.module.css";
import { Title } from "../../../common/title/Title";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

export default function Dashboard() {
  const data = {
    labels: ["Go", "Python", "Kotlin", "JavaScript", "R", "Swift"],
    datasets: [
      {
        label: "# of Votes",
        data: [35, 25, 22, 20, 18, 15],
        backgroundColor: [
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
          "#fff",
          "#FE452A",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Title title="Dashboard" />
      <div className={styles.cards}>
        <Card title="200" color="green" subtitle="Total Books" icon="Books" />
        <Card
          color="blue"
          title="80"
          subtitle="Books Borrowed"
          icon="bookupload"
        />
        <Card
          title="20"
          color="red"
          subtitle="Expired Books"
          icon="booksexpire"
        />
        <Card
          title="300"
          color="orange"
          subtitle="Total Students"
          icon="students"
        />
      </div>
      <div className={styles.middlecontainer}>
        <Issuebook />
        <div className={styles.ChartContainer}>
          
        </div>
      </div>
    </>
  );
}
