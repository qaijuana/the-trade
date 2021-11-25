import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap"
//! COMPONENTS
import LearnReact from "./components/LearnReact";
import useAuth from "./components/useAuth";
import AppBar from "./components/AppBar";
//! PAGES
import ShowProfile from "./pages/ShowProfile";
import ShowList from "./pages/ShowList";
import EditProfile from "./pages/EditProfile";
import LoginSign from "./pages/LoginSign";
import Marketplace from "./pages/Marketplace";
import NewList from "./pages/NewList";


import "./styles/App.css";


function App() {

  const navigate = useNavigate();

  //! CHANGE currentUser TO *NULL* FOR PRODUCTION
  const [currentUser, setCurrentUser] = useState()
  const [isAuth, login, logout] = useAuth(
    !currentUser, setCurrentUser, currentUser
  );


  //! RELOGIN IF REFRESHED
  //! ADD FETCH FOR MARKETPLACE
  // useEffect(() => {
  //   const cookieCheck = async () => {
  //     const res = await fetch("/api/login/token", {
  //       method: "POST",
  //     })
  //     const data = await res.json();
  //     console.log(res.ok)
  //     if (res.ok === false) {
  //       console.log("res.ok is not ok")
  //       // navigate("/login");
  //     }
  //     console.log(data.id, "res.ok is ok")
  //     setCurrentUser(data.id);
  //     console.log("useEffect", currentUser);
  //   }
  //   // cookieCheck();
  // }, [])


  //! Throwaway components 

  function Page({ title }) {
    return (
      <div className="test">
        <h1>
          {title}
        </h1>
        {
          (title === "marketplace") ?
            <Marketplace /> :
            ""
        }
      </div>
    )
  }


  return (


    <div className="App">
      <AppBar currentUser={currentUser} logout={logout} />

      <Container>
        <Routes>
          <Route index element={<Page title={"home"} />} />
          <Route path="/user/:id" element={<ShowProfile />}>
          </Route>
          <Route path="/user/:id/edit" element={<EditProfile currentUser={currentUser} />} />
          <Route path="/marketplace" element={<Page title={"marketplace"} />} />
          <Route path="/list/:id" element={<ShowList/>} />
          <Route path="/login" element={<LoginSign setCurrentUser={setCurrentUser} login={login} action="Login" />} />
          <Route path="/signup" element={<LoginSign action="Sign Up" />} />
          <Route path="/inbox" element={<Page title="inbox" />} />
          <Route path="/learn" element={<LearnReact />} />
          <Route path="/create" element={<NewList currentUser={currentUser} />} />
        </Routes>
      </Container>
    </div>

  );
}

export default App;
