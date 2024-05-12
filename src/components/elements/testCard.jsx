import { Typography } from "@mui/material";
import styles from "../../css/components/elements/testCard.module.css";
import InputGroup from "../inputs/inputGroup";

export default function TestCard() {
  return (
    <div className={styles.Card}>
      <InputGroup label={"Active Tests"} hasInput={false}>
        <Typography variant="body1">25</Typography>
      </InputGroup>
      <InputGroup label={"Tests Administered"} hasInput={false}>
        <Typography variant="body1">1698</Typography>
      </InputGroup>
      <InputGroup label={"Tests Passed"} hasInput={false}>
        <Typography variant="body1">728</Typography>
      </InputGroup>
      <InputGroup label={"Tests Failed"} hasInput={false}>
        <Typography variant="body1">970</Typography>
      </InputGroup>
    </div>
  );
}
