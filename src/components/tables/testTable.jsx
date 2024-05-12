import { Typography } from "@mui/material";
import governor from "../../css/global/governor.module.css";
import BaseTable from "./baseTable";

export default function TestTable() {
  return (
    <div className={governor.Table}>
      <Typography variant="caption">Tests</Typography>
      <BaseTable />
    </div>
  );
}
