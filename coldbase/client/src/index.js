import React from "react";
import ReactDOM from 'react-dom';

import { ColdbaseProvider } from './scripts/coldbase_context';
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import './index.css';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#7b8fff",
            color: "white"
          }
        }}
      />
      <Navbar />
      <Main />
    </>
  )
}

ReactDOM.render(
  <ColdbaseProvider>
    <App />
  </ColdbaseProvider>,
  document.getElementById('root')
)