import { Typography } from "@mui/material";
import governor from "../../css/global/governor.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Modal({
  modalTitle = "Modal Title",
  modalButtonFunction = console.log("Clicked"),
  modalButtonText = "click me",
  children = <></>,
  toggleModal,
}) {
  return (
    <div className={governor.ModalContainer}>
      <div className={governor.ModalContent}>
        <div className={governor.ModalHeader}>
          <ArrowBackIcon
            className={governor.ModalIcon}
            onClick={() => toggleModal()}
          />
          <Typography>{modalTitle}</Typography>
        </div>
        <div className={governor.ModalMain}>{children}</div>
        <div className={governor.ModalFooter}>
          <button
            onClick={modalButtonFunction}
            className={governor.ModalButton}
          >
            {modalButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
