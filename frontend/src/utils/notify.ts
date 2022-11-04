import { toast } from "react-toastify";

export function notifyNetworkError(
  message = "Network error. Please contact to your maintainer.",
  closeAfter = 10 * 1000 // 10 sec
) {
  toast.error(message, {
    autoClose: closeAfter,
  });
}
