import React, { useContext, useEffect, useRef, useState } from "react";
import { coldbaseContext } from "../scripts/coldbase_context";
import aes from "crypto-js/aes";
import toast from "react-hot-toast";

function Chatbox() {
    const { contextKeyRoom, contextUsername, contextSocket, contextMessages, contextPhase } = useContext(coldbaseContext)
    const [phase] = contextPhase
    const [keyRoom] = contextKeyRoom
    const [username] = contextUsername
    const [messages, setMessages] = contextMessages
    const socket = contextSocket

    const [message, setMessage] = useState("")
    const chatMessagesRef = useRef()

    useEffect(() => {
        if (!chatMessagesRef || !chatMessagesRef.current) return
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (phase === 1) { window.onkeyup = (e) => { if (e.key === "PrintScreen") socket.emit("userTakePrint", { username: username, socket_id: socket.id, keyRoom: keyRoom }) } }
        return () => window.onkeyup = null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="coldbase_chatbox">
            <ul className="coldbase_chatmessages" ref={chatMessagesRef}>
                {messages.map((m, i) => {
                    if (m.username === "coldbase(system)") {
                        return <li key={i}><strong style={{ color: "#87FD87" }}>{m.username}</strong> - {m.message}</li>
                    } else {
                        return <li key={i}><strong>{m.username}</strong>: {m.message}</li>
                    }
                })}
            </ul>
            <input
                className="coldbase_chatinput"
                type="text"
                value={message}
                onKeyPress={({ key }) => {
                    if (key === "Enter") {
                        if (message.length < 1) return toast.error("Write a message.")
                        const encryptedMessage = aes.encrypt(message, "123").toString()
                        socket.emit("newMessage", { username: username, socket_id: socket.id, message: encryptedMessage, keyRoom: keyRoom })
                        setMessages(state => [...state, { username: username, socket_id: socket.id, message: message, keyRoom: keyRoom }])
                        setMessage("")
                    }
                }}
                onInput={e => setMessage(e.target.value)}
            />
        </div>
    )
}

export default Chatbox