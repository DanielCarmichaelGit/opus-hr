import { Typography } from "@mui/material";
import governor from "../../css/global/governor.module.css";
import BaseTable from "./baseTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTests } from "../../StateManagement/Actions/actions";
import CustomSkeleton from "../elements/skeleton";

export default function TestTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const tests = useSelector((state) => state.app.tests);
  const hasMore = useSelector((state) => state.app.hasMore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tests) {
      dispatch(fetchTests(0, 25, "", 0, "all"));
      setIsLoading(false);
    } else {
      const testRows = tests.map((test) => {
        return {
          title: test.test_content.test_title,
          sections: test.test_content.test_sections.length,
          administered: 0,
        };
      });

      setRows(testRows);
    }
  }, [tests, dispatch]);

  return (
    <div className={governor.Table}>
      <Typography variant="caption">Tests</Typography>
      {isLoading ? (
        <CustomSkeleton count={3} height={"100px"} width={"100%"} />
      ) : (
        <BaseTable
          headers={["Title", "Sections", "Administered"]}
          rows={rows}
        />
      )}
    </div>
  );
}
