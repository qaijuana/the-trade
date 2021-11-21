import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LearnReact from "./components/LearnReact";
// import './App.css';
import "./styles/App.css"

function App() {

  const [logged, setLogged] = useState(true);

  function handleLogin(e) {
    e.preventDefault();
    setLogged(!logged)
  }
  function handleLogout(e) {
    e.preventDefault();
    setLogged(true)
  }

  function UserPage() {
    return (
      <Link to="/user/edit">Edit</Link>
    )
  }

  function Page({ title }) {
    return (
      <div className="test">
        <h1>
          {title}
        </h1>
      </div>
    )
  }

  function NavBar() {


    return (
      <div className="header">
        <div className="nav-1">
          <Link to={"/"}>Home</Link>
          <Link to={"/marketplace"}>Shop</Link>
        </div>
        {(logged) ?
          <div className="nav-2">
            <Link to={"/learn"}>Learn</Link>
            <Link to={"/login"} onClick={handleLogin}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </div>
          :
          <div className="nav-2">
            <Link to={"/learn"}>Learn</Link>
            <Link to={"/list"}>Add</Link>
            <Link to={"/user"}>Profile</Link>
            <Link to={"/logout"} onclick={handleLogout}>Logout</Link>
          </div>}
      </div>

    )
  }

  return (
    <Router>
      <div className="App">
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/" element={<Page title={"home"} />} />
            <Route path="/marketplace" element={<Page title={"marketplace"} />} />
            <Route path="/login" element={<Page title={"login"} />} />
            <Route path="/signup" element={<Page title={"signup"} />} />
            <Route path="/user" element={<UserPage />}>
            </Route>
            <Route path="/user/edit" element={<Page title={"edit"} />} />
            <Route path="/learn" element={<LearnReact />} />


          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
