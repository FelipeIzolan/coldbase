import { AES, enc } from "crypto-js";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import notify from "./notify";

export const coldbaseContext = createContext()
export const ColdbaseProvider = ({ children }) => {
  const [key, setKey] = useState("")
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState({})

  const resetStates = useCallback(() => {
    setUsername("")
    setKey("")
    setMessages([])
  }, [setUsername, setKey, setMessages])

  useEffect(() => {
    let socket = io("http://localhost:5000", { reconnection: false })
    setSocket(socket)

    socket.on("connect", () => console.log("Socket connected | " + socket.id + "."))
    socket.on("disconnect", () => { console.log("Socket disconnected."); resetStates() })

    socket.on("leader-disconnect", () => {
      resetStates()
      notify("warning", "The room leader disconnected.")
    })

    socket.on("key-room", (key) => setKey(key))
    socket.on("user-connect", ({ username, id }) => notify("success", `${username}(${id.slice(0, 8)}...) connected.`))
    socket.on("user-disconnect", ({ username, id }) => notify("error", `${username}(${id.slice(0, 8)}...) disconnected.`))
    socket.on("error", (error) => notify("error", error))
  }, [])

  useEffect(() => {
    if (socket.on) {
      socket.on("message-room", ({username, message, id}) => {
        let decryptedMessage = AES.decrypt(message, key).toString(enc.Utf8)
        setMessages((prevMessages) => [...prevMessages, {username: username, message: decryptedMessage, id: id}])
      })
    }
  }, [key])

  return (
    <coldbaseContext.Provider value={{
      key: [key, setKey],
      messages: [messages, setMessages],
      username: [username, setUsername],
      socket: socket
    }}>
    {children}
    </coldbaseContext.Provider>
  )
}
