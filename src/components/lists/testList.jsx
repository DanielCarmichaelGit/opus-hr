import governor from "../../css/global/governor.module.css";
import styles from "../../css/components/lists/testList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTests } from "../../StateManagement/Actions/actions";
import CustomSkeleton from "../elements/skeleton";
import BaseList from "./baseList";
import { Typography } from "@mui/material";

export default function TestList({ selectedTest, setSelectedTest }) {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const tests = useSelector((state) => state.app.tests);
  const hasMore = useSelector((state) => state.app.hasMore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tests) {
      setIsLoading(true);
      dispatch(fetchTests(0, 25, "", 0, "all"));
      setIsLoading(false);
    } else if (tests.length > 0) {
      setSelectedTest(tests[0]);
    } else {
      console.log(tests);
    }
  }, [tests, dispatch, setSelectedTest]);

  return (
    <BaseList direction={"column"}>
      {isLoading ? (
        <CustomSkeleton count={3} height={"100px"} width={"100%"} />
      ) : (
        tests?.map((test) => {
          return (
            <div
              key={test.test_id}
              className={
                selectedTest?.test_id === test.test_id
                  ? `${governor.Card} ${governor.Selected}`
                  : governor.Card
              }
            >
              <div className={governor.CardHeader}>
                <Typography fontWeight={600} variant="body1">
                  {test.test_content.test_title}
                </Typography>
                <Typography variant="caption">{test.source}</Typography>
              </div>
              <div className={governor.CardMain}>
                <div className={governor.CardContentWithLabel}>
                  <Typography variant="caption">
                    {
                      `${test.test_content.test_sections.length} Sections`
                    }
                  </Typography>
                  {test.test_content.test_sections.map((section, index) => {
                    return (
                      <div
                        className={styles.Section}
                        key={`${test.test_id}_section_${index + 1}`}
                      >
                        <Typography fontSize={12} variant="body1">
                          {section.title || "null"}
                        </Typography>
                        <Typography
                          minWidth={"100px"}
                          textAlign={"right"}
                          variant="body1"
                        >
                          {`${section.time_allowed} mins`}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={governor.CardFooter}>
                <Typography variant="caption">
                  {`${test.administered || 0} tests taken`}
                </Typography>
                <Typography variant="caption">{`${
                  test.pass_rate || 50
                }% pass rate`}</Typography>
              </div>
            </div>
          );
        })
      )}
    </BaseList>
  );
}
