import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap"
//! COMPONENTS
import LearnReact from "./components/LearnReact";
import useAuth from "./components/useAuth";
import AppBar from "./components/AppBar";
//! PAGES
import EditProfile from "./pages/EditProfile";
import LoginSign from "./pages/LoginSign";
import Marketplace from "./pages/Marketplace";


import "./styles/App.css";


function App() {
  
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuth, login, logout] = useAuth(
    !currentUser, setCurrentUser, currentUser
    );
    // const navigate = useNavigate();
    
  //! RELOGIN IF REFRESHED
  useEffect(() => {
    const cookieCheck = async () => {
      const res = await fetch("/api/login/token", {
        method: "POST",
      })
      console.log("CookieCheck res", res.ok);
      if (!res.ok) {
        
      }
      const data = await res.json();
      console.log("Cookie Check Data", await data);
    }
    // cookieCheck();

  },[])

  function UserPage() {
    return (
      <Link to={"/user/" + currentUser +"/edit"}>
        <h1>edit</h1>
      </Link>
    )
  }

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

    <Router>
      <div className="App">
        {/* <NavBar currentUser={currentUser} logout={logout} /> */}
        <AppBar currentUser={currentUser} logout={logout} />

        <Container>
          <Routes>
            <Route index element={<Page title={"home"} />} />
            <Route path="/user/:id" element={<UserPage />}>
            </Route>
            <Route path="/user/:id/edit" element={<EditProfile />} />
            <Route path="/marketplace" element={<Page title={"marketplace"} />} />
            <Route path="/login" element={<LoginSign setCurrentUser={setCurrentUser} login={login} action="Login" />} />
            <Route path="/signup" element={<LoginSign action="Sign Up" />} />
            <Route path="/inbox" element={<Page title="inbox" />} />
            <Route path="/learn" element={<LearnReact />} />
            <Route path="/create" element={<Page title={"add"} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
