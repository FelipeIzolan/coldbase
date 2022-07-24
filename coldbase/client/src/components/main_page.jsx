import { useRef, useContext } from "react";
import { coldbaseContext } from "../scripts/coldbase_context.js";
import notify from "../scripts/notify.js";
import logo from "../images/logo.png";

export default function MainPage() {
  const context = useContext(coldbaseContext)
  const socket = context.socket
  const setUsername = context.username[1]

  var usernameRef = useRef()
  var keyRef = useRef()

  const mainHandler = (type) => {
    let username = usernameRef.current.value
    let key = keyRef.current.value

    if (!socket.connected) return notify("error", "Unable connect to server, reload page.")
    else if (!username || username.length === 0 || username.length > 28 ) return notify("error", "Invalid username.")
    else if (!key && type === "join") return notify("error", "Invalid key.")

    setUsername(username)

    switch(type) {
      case "join": socket.emit("join-room", { username: username, key: key }); break
      case "create": socket.emit("create-room", { username: username }); break
    }
  }

  return (
  <>
  <div className="main-container showUp">
    <img src={logo} width="288" />
    <input type="text" maxLength={28} ref={usernameRef} placeholder="Username" />
    <input type="text" ref={keyRef} placeholder="Key" />
    <div className="main-button">
      <button onClick={() => mainHandler("join")}>JOIN</button>
      <button onClick={() => mainHandler("create")}>CREATE</button>
    </div>
  </div>
  <hr className="main-gradient backgroundScroll" />
  </>
  )
}
