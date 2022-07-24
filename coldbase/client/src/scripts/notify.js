import toast from "react-hot-toast";

function notify(type, message) {
  switch(type) {
    case "error": toast(message, { icon: "🔴" }); break
    case "warning": toast(message, { icon: "🟡" }); break
    case "success": toast(message, { icon: "🟢" }); break
  }
}

export default notify
