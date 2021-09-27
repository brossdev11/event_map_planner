import { store } from "react-notifications-component";

export const Toast = ({ title, message, type }) => {
  store.addNotification({
    title:title,
    message:message,
    type: type,
    insert: "top",
    container: "top-center",
    dismiss: {
      duration: 4000,
    },
  });
};
