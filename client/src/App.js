import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes, Route, Outlet } from "react-router-dom";
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
  useEffect(() => {
    const cookieCheck = async () => {
      const res = await fetch("/api/login/token")
      const data = await res.json();
      const ok = await res.ok
      console.log(ok)
      if (ok) {
        console.log(data.id, "res.ok is ok")
        setCurrentUser(data.id);
        console.log("useEffect", currentUser);
        navigate("/marketplace")
      }
      console.log("res.ok is not ok")
      navigate("/login");
    }
    cookieCheck();
  }, [])

  function UserPage() {
    return (
      <>
        <Outlet />
      </>
    ) 
  }


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

          <Route path="/user" element={<UserPage />}>
            < Route path=":id" element={<ShowProfile currentUser={currentUser} />} />
            <Route path=":id/edit" element={<EditProfile currentUser={currentUser} />} />
          </Route>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/list/:id" element={<ShowList />} />
          <Route path="/login" element={<LoginSign setCurrentUser={setCurrentUser} login={login}
            action="Login" currentUser={currentUser} />} />
          <Route path="/signup" element={<LoginSign action="Sign Up" />} />
          <Route path="/inbox" element={<Page title="inbox" />} />
          <Route path="/learn" element={<LearnReact />} />
          <Route path="/create" element={<NewList currentUser={currentUser} />} />
        </Routes>
      </Container>
    </div >

  );
}

export default App;
