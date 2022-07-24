import { useContext, useState, useRef, useEffect } from "react";
import { AES } from "crypto-js";
import { coldbaseContext } from "../scripts/coldbase_context.js";
import logo from "../images/logo.png";

export default function ChatPage() {
  const context = useContext(coldbaseContext)
  const username = context.username[0]
  const key = context.key[0]
  const socket = context.socket 

  var [hide, setHide] = useState(false)
  var [messages, setMessages] = context.messages
  var inputRef = useRef()
  var chatBoxRef = useRef()

  const listMessages = (message, index) => (
    <li key={"message-" + index}>
      <b>{message.username}({message.id.slice(0, 8)}...)</b>: {message.message}
    </li>
  )

  const inputHandler = (e) => {
    if (e.key === "Enter" && inputRef.current.value !== "") {
      let message = inputRef.current.value
      let encryptedMessage = AES.encrypt(message, key).toString()

      setMessages((prevMessages) => [...prevMessages, {username: username, message: message, id: socket.id}])
      socket.emit("message-room", {username: username, message: encryptedMessage})
      inputRef.current.value = ""
    }
  }

  useEffect(() => {
    chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight)
  }, [messages])

  return (
    <>
    <main className="chat-container">
      <div className="chat-header">
        <img src={logo} width="104" onClick={() => window.location.reload()}/>
        <div>
          <h4 className="chat-key"><span>Key</span> - {hide === true ? "hidden" : key}</h4>
          <input onChange={e => setHide(e.target.checked)} type="checkbox"/>
          <label>Hide?</label>
        </div>
      </div>
      <ul ref={chatBoxRef} className="chat-box">
        {messages.map(listMessages)}
      </ul>
      <label className="chat-input-prompt blink">{">"}</label>
      <input className="chat-input" ref={inputRef} type="text" onKeyUp={inputHandler}  />
    </main>
    <hr className="coldbase-gradient backgroundScroll" />
    </>
  )
}
