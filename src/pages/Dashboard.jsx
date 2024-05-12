import { useEffect, useState } from "react";
import Header from "../components/elements/header";
import styles from "../css/pages/dashboard.module.css";
import governor from "../css/global/governor.module.css";
import TestCard from "../components/elements/testCard";
import DashboardCharts from "../components/charts/dashboardCharts";
import TestTable from "../components/tables/testTable";

export default function Dashbboard() {
  return (
    <div className={governor.Governor}>
      <div className={styles.Dashboard}>
        <TestTable />
      </div>
    </div>
  );
}
