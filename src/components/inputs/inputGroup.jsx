import { Typography } from "@mui/material";
import governor from "../../css/global/governor.module.css";

export default function InputGroup({
  label,
  inputValueChange,
  inputValue,
  inputType,
  hasInput = true,
  children,
  errors,
}) {
  return (
    <div className={governor.InputGroup}>
      <label className={governor.InputGroupLabel}>{label}</label>
      {
        hasInput ? (
            <>
                <input
                className={governor.InputGroupField}
                value={inputValue}
                onChange={(e) => inputValueChange(e.target.value)}
                type={inputType}
                />
                <Typography className={governor.InputGroupFieldError}>
                    {errors[label] ? errors[label] : ""}
                </Typography>
            </>
        ) : (
            children
        )
      }
    </div>
  );
}
