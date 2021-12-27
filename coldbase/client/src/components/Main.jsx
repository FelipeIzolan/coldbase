import React, { useContext } from "react";
import { coldbaseContext } from "../scripts/coldbase_context";
import Chatbox from "./Chatbox";
import toast from "react-hot-toast";

import "./styles/main.component.css";

function Main() {
    const { contextPhase, contextKeyRoom, contextUsername, contextSocket, contextUsers } = useContext(coldbaseContext)
    const [phase, setPhase] = contextPhase
    const [keyRoom, setKeyRoom] = contextKeyRoom
    const [username, setUsername] = contextUsername
    const setUsers = contextUsers[1]
    const socket = contextSocket

    function createRoom() {
        if (username.length < 1) return toast.error("Determine a username.")
        if (username.length > 25) return toast.error("Username must be up to 25 characters")
        socket.emit("createRoom", { username: username, timestamp: Date.now(), socket_id: socket.id })
        socket.once("createRoom", data => {
            if (data.status === "error") return toast.error(data.message)
            setUsers(data.users)
            setKeyRoom(data.keyRoom)
            setPhase(1)
        })
    }

    function joinRoom() {
        if (username.length < 1) return toast.error("Determine a username.")
        if (username.length > 25) return toast.error("Username must be up to 25 characters")
        if (keyRoom.length !== 40) return toast.error("Invalid key.")
        socket.emit("joinRoom", { username: username, socket_id: socket.id, keyRoom: keyRoom })
        socket.once("joinRoom", data => {
            if (data.status === "error") return toast.error(data.message)
            setUsers(data.users)
            setKeyRoom(data.keyRoom)
            setPhase(1)
        })
    }

    if (phase === 0) {
        return (
            <main className="coldbase_main">
                <div className="coldbase_main_inputs">
                    <input type="text" placeholder="Username" value={username} maxLength={25} onInput={e => setUsername(e.target.value)} />
                    <input type="text" placeholder="Key" value={keyRoom} maxLength={40} onInput={e => setKeyRoom(e.target.value)} />
                    <div className="coldbase_main_buttons">
                        <button onClick={joinRoom}>JOIN</button>
                        <button onClick={createRoom}>CREATE</button>
                    </div>
                </div>
            </main>
        )
    } else if (phase === 1) {
        return (
            <main className="coldbase_main">
                <Chatbox />
            </main>
        )
    }
}

export default Main