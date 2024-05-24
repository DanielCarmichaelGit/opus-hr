import styles from "../css/pages/dashboard.module.css";
import governor from "../css/global/governor.module.css";
import TestTable from "../components/tables/testTable";
import Tests from "./Tests";
import { useState } from "react";
import { useSocket } from "../Providers/socketContext";
import Modal from "../components/modals/baseModal";
import CreateTestForm from "../components/forms/createTest";
import TestList from "../components/lists/testList";
import InputGroup from "../components/inputs/inputGroup";
import fetchWrapper from "../../utils/API/fetchWrapper";

export default function Dashboard() {
  const [createTestModal, setCreateTestModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [errors, setErrors] = useState({});

  const socket = useSocket();

  function handleOptionSelect(option) {
    setSelectedOption(option);
  }

  function handleCreateTestModal() {
    setCreateTestModal(!createTestModal);
  }

  function handleCandidateInvite() {
    const payload = {
      email: inviteeEmail,
      test_id: selectedTest.test_id,
    };

    fetchWrapper(
      "/api/services/email/send-test-invite",
      localStorage.getItem("OPUS-TOKEN"),
      "POST",
      { ...payload },
      false
    ).then((res) => {
      console.log(res);
    });
  }

  function handleModalCreate() {
    const payload = {
      prompt: {
        description: jobDescription,
        seniority: selectedOption,
      },
    };

    socket.emit("authenticate", localStorage.getItem("OPUS-TOKEN"));
    socket.emit("generateTest", payload);

    socket.on("testStatus", (data) => {
      console.log("Test Status:", data.message);
    });

    socket.on("testResult", (data) => {
      console.log("Test Result:", data.response);
      // Handle the test result, e.g., update the UI or store the result
    });

    socket.on("testCompleted", () => {
      console.log("Test generation completed");
      // Perform any necessary actions after the test generation is completed
      setCreateTestModal(false); // Close the modal
    });

    socket.on("testFailed", (data) => {
      console.error("Test Failed:", data.message);
      if (data.error) {
        console.error("Error Details:", data.error);
      }
      // Handle the test generation failure, e.g., show an error message to the user
    });

    // Remove the socket event listeners when the component unmounts or when the modal is closed
    return () => {
      socket.off("testStatus");
      socket.off("testResult");
      socket.off("testCompleted");
      socket.off("testFailed");
    };
  }

  return (
    <div className={governor.Governor}>
      {createTestModal ? (
        <Modal
          toggleModal={handleCreateTestModal}
          modalButtonFunction={handleModalCreate}
          modalTitle="Create a Test"
          modalButtonText="Create Test"
        >
          <CreateTestForm
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
          />
        </Modal>
      ) : null}
      <div className={styles.Dashboard}>
        <div className={styles.DashboardLeft}>
          <Tests toggleModal={handleCreateTestModal} />
          {/* <TestTable /> */}
          <TestList
            selectedTest={selectedTest}
            setSelectedTest={setSelectedTest}
          />
        </div>
        <div className={styles.DashboardRight}>
          <InputGroup
            errors={errors}
            label={"Invite a Candidate"}
            inputValue={inviteeEmail}
            inputValueChange={setInviteeEmail}
            inputType={"email"}
          />
          <button onClick={() => handleCandidateInvite()}>
            Invite Candidate
          </button>
        </div>
      </div>
    </div>
  );
}
