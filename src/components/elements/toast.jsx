import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import governor from "../../css/global/governor.module.css";
import { useEffect } from "react";

export default function CustomToast({ message, sendNotification, setSendNotifitcation }) {
  function notify(customMessage) {
    toast(customMessage, {
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  useEffect(() => {
    if (sendNotification) {
        notify(message);
        setSendNotifitcation(false)
    }
  }, [sendNotification, message, setSendNotifitcation])

  return <ToastContainer className={governor.ToastContainerStyle} />;
}
