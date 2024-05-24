import { useState } from "react";
import governor from "../../css/global/governor.module.css";
import InputGroup from "../inputs/inputGroup";
import Dropdown from "../inputs/dropdown";

export default function CreateTestForm({
  selectedOption,
  handleOptionSelect,
  jobDescription,
  setJobDescription,
}) {
  const [errors, setErrors] = useState({});

  function validateInputs() {
    const errors = {};

    // Validate job description
    if (!jobDescription.trim()) {
      errors["Job Description"] = "A Job Description is Required";
    } else if (jobDescription.length < 50) {
      errors["Job Description"] =
        "The job description must be at least 50 characters long";
    }

    // Validate seniority option
    if (!selectedOption) {
      errors["Selected Option"] = "You must select a seniority option";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  }

  return (
    <form className={governor.ModalForm}>
      <div className={governor.FormMain}>
        <InputGroup
          label={"Job Description"}
          inputType={"textarea"}
          inputValue={jobDescription}
          inputValueChange={setJobDescription}
          errors={errors}
        />
        <Dropdown
          options={[
            "Entry Level",
            "Junior",
            "Mid Level",
            "Senior",
            "Executive",
          ]}
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
        />
      </div>
    </form>
  );
}
