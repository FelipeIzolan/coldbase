import React, { createContext, useEffect, useState } from "react";
import aes from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

export const coldbaseContext = createContext()
export const ColdbaseProvider = (props) => {
    const [phase, setPhase] = useState(0)

    const [socket, setSocket] = useState(null)
    const [keyRoom, setKeyRoom] = useState("")
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const socket = io("http://localhost:5000")
        setSocket(socket)

        socket.on("leaveUser", data => {
            setUsers(state => state.filter(user => user.socket_id !== data.socket_id))
            setMessages(state => [...state, { username: "coldbase(system)", message: `${data.username} (${data.socket_id}) left from room.` }])
        })

        socket.on("newUser", data => {
            setUsers(state => [...state, data])
            setMessages(state => [...state, { username: "coldbase(system)", message: `${data.username} (${data.socket_id}) joined on room.` }])
        })

        socket.on("newMessage", data => {
            if (data.status === "error") return toast.error(data.message)
            const decryptedMessage = aes.decrypt(data.message, "createdByFelipeIzolan2021").toString(Utf8)
            setMessages(state => [...state, { username: data.username, socket_id: data.socket_id, message: decryptedMessage }])
        })

        socket.on("disconnectRoom", ({ status, leader }) => {
            if (status === "error") return toast.error("Ops.. error disconnecting from room.")
            if (leader) toast("Disconnected, the room leader left.", { icon: "😱" })
            setKeyRoom("")
            setUsername("")
            setUsers([])
            setMessages([])
            setPhase(0)
        })
        
        return () => socket.close()
    }, [])

    return (
        <coldbaseContext.Provider
            value={{
                contextPhase: [phase, setPhase],
                contextKeyRoom: [keyRoom, setKeyRoom],
                contextUsername: [username, setUsername],
                contextUsers: [users, setUsers],
                contextMessages: [messages, setMessages],
                contextSocket: socket
            }}
        >
            {props.children}
        </coldbaseContext.Provider>
    )
}