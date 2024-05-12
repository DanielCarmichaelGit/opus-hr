import OpusAreaChart from "./area";
import OpusPieChart from "./pie";
import styles from "../../css/components/charts/dashboardCharts.module.css";

export default function DashboardCharts() {
    return (
        <div className={styles.DashboardCharts}>
            <OpusAreaChart />
            <OpusPieChart />
        </div>
    )
}