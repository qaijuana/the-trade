import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//! COMPONENTS
import LearnReact from "./components/LearnReact";
import useAuth from "./components/useAuth";
import NavBar from "./components/NavBar";
//! PAGES
import ProfileEdit from "./pages/ProfileEdit";
import LoginSign from "./pages/LoginSign";
import Marketplace from "./pages/Marketplace";

import "./styles/App.css";


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [isAuth, login, logout] = useAuth(
    !currentUser, setCurrentUser, currentUser
  );

  function UserPage() {
    return (
      <Link to="/user/edit">
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

  function RefreshToken(props) {

    async function handleRefresh() {
      const res = await fetch("/api/login/token", {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        }
      });
      const data = res.json();
    };

    return (
      <div className="refresh">
        <button onClick={handleRefresh}>click me</button>
      </div>
    )
  }


  return (

    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} logout={logout} />
        <div className="container">
          <Routes>
            <Route path="user" element={<UserPage />}>
            </Route>
            <Route path="/user/edit/:id" element={<ProfileEdit />} />
            <Route index element={<Page title={"home"} />} />
            <Route path="/marketplace" element={<Page title={"marketplace"} />} />
            <Route path="/login" element={<LoginSign setCurrentUser={setCurrentUser} login={login} action="Login" />} />
            <Route path="/signup" element={<LoginSign action="Sign Up" />} />
            <Route path="/inbox" element={<Page title="inbox"/>}/>
            <Route path="/learn" element={<LearnReact />} />
            <Route path="/create" element={<Page title={"add"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
