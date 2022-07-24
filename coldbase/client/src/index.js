import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { ColdbaseProvider, coldbaseContext } from './scripts/coldbase_context';
import { Toaster } from 'react-hot-toast';

import MainPage from './components/main_page.jsx';
import ChatPage from './components/chat_page.jsx';

import './index.css';
import './components/styles/animation.css';
import './components/styles/main.page.css';
import './components/styles/chat.page.css';

function App() {
  const context = useContext(coldbaseContext)
  const key = context.key[0]
  const socket = context.socket
  const username = context.username

  return (
    <>
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#31315E",
          color: "white"
        }
      }}
    />
    {key !== "" && socket.connected ? <ChatPage /> : <MainPage />}
    </>
  )
}

ReactDOM.render(
  <ColdbaseProvider>
    <App/>
  </ColdbaseProvider>,
  document.getElementById("root")
)

