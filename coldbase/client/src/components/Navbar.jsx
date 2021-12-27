import React, { useContext, useState } from "react";
import { coldbaseContext } from "../scripts/coldbase_context";

import coldbase_logo from "../images/coldbase_logo.png";
import "./styles/navbar.component.css";

function Navbar() {
    const { contextPhase, contextKeyRoom, contextSocket, contextUsername } = useContext(coldbaseContext)
    const [keyRoom] = contextKeyRoom
    const [phase] = contextPhase
    const [username] = contextUsername
    const socket = contextSocket

    const [hide, setHide] = useState(false)

    function disconnectRoom() {
        socket.emit("disconnectRoom", { username: username, socket_id: socket.id, keyRoom: keyRoom })
    }

    if (phase === 0) {
        return (
            <nav className="coldbase_navbar" style={{ background: "none", width: "100%", justifyContent: "center", marginTop: "50px" }}>
                <label className="coldbase_navbar_logo" style={{ backgroundImage: `url(${coldbase_logo})`, width: "250px", height: "250px" }} />
            </nav>
        )
    } else if (phase === 1) {
        return (
            <nav className="coldbase_navbar">
                <label className="coldbase_navbar_logo" onClick={disconnectRoom} style={{ backgroundImage: `url(${coldbase_logo})` }} />
                <div className="coldbase_navbar_key">
                    {hide === false ? (<h5><strong>key</strong>: {keyRoom}</h5>) : (<h5><strong>key</strong>: censored</h5>)}
                    <input type="checkbox" onChange={e => setHide(e.target.checked)} />
                    <label>hide?</label>
                </div>
            </nav >
        )

    }
}

export default Navbar