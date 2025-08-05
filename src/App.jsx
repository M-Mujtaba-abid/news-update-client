import React from 'react'
// import UserLayout from './layout/UserLayout'
import BothLayout from './layout/BothLayout'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* <UserLayout/> */}
      <BothLayout/>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}

export default App
