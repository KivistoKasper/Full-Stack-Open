import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  //console.log("msg ", notification);
  if (notification === null) return null;

  const { msg, state } = notification;

  const style = {
    backgroundColor: "lightgrey",
    margin: "10px",
    padding: "10px",
    border: "2px solid",
    borderColor: state === "success" ? "green" : "red",
    borderRadius: "5px",
  };

  return <div style={style}>{msg}</div>;
};

export default Notification;
