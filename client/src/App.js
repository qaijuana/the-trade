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
import EditList from "./pages/EditList";
import TheInbox from "./pages/TheInbox";



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
        setCurrentUser(data.id);
        // navigate("/marketplace")
      }
      console.log("res.ok is not ok")
      navigate("/login");
    }
    cookieCheck();
  }, [])

  function Page() {
    return (
      <>
        <Outlet />
      </>
    )
  }


  //! Throwaway components 




  return (


    <div className="App">
      <AppBar currentUser={currentUser} logout={logout} />

      <Container>
        <Routes>
          <Route index element={<Page title={"home"} />} />
          <Route path="/marketplace" element={<Marketplace />} />

          <Route path="/user" element={<Page />}>
            < Route path=":id" element={<ShowProfile currentUser={currentUser} />} />
            <Route path=":id/edit" element={<EditProfile currentUser={currentUser} />} />
          </Route>

          <Route path="/list" element={<Page />}>
            <Route path=":id" element={<ShowList />} />
            <Route path=":id/edit" element={<EditList currentUser={currentUser} />} />
          </Route>

          <Route path="/login" element={<LoginSign setCurrentUser={setCurrentUser} login={login}
            action="Login" currentUser={currentUser} />} />
          <Route path="/signup" element={<LoginSign action="Sign Up" />} />
          <Route path="/inbox" element={<TheInbox/>} />
          <Route path="/learn" element={<LearnReact />} />
          <Route path="/create" element={<NewList currentUser={currentUser} />} />
        </Routes>
      </Container>
    </div >

  );
}

export default App;
