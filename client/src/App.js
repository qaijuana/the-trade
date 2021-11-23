import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LearnReact from "./components/LearnReact";
import ProfileEdit from "./pages/ProfileEdit";
import useAuth from "./components/useAuth";
import LoginSign from "./pages/LoginSign";
import "./styles/App.css"


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [isAuth, login, logout] = useAuth(!currentUser, setCurrentUser, currentUser);

  console.log(isAuth, currentUser);

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
      </div>
    )
  }


  function NavBar() {

    function AuthUser() {

      return (
        (isAuth) ?
          <>
            <Link to={"/learn"}>Learn</Link>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/login"} >Login</Link>
          </>
          :
          <>
            <Link to={"/create"}>Add</Link>
            <Link to={"/learn"}>Learn</Link>
            <Link to={"/user"}>Profile</Link>
            <Link to={"/"} onClick={logout}>Logout</Link>
          </>
      )
    }

    return (
      <div className="header">
        <div className="header-1">
          <Link to={"/"}>Home</Link>
          <Link to={"/marketplace"}>Shop</Link>
        </div>
        <div className="header-2">
          <AuthUser />
        </div>

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
            <Route path="/login" element={<LoginSign setCurrentUser={setCurrentUser} login={login} action="Login" />} />
            <Route path="/signup" element={<LoginSign action="Sign Up" />} />
            <Route path="/user" element={<UserPage />}>
            </Route>
            <Route path="/user/edit" element={<ProfileEdit />} />
            <Route path="/learn" element={<LearnReact />} />
            <Route path="/create" element={<Page title={"add"} />} />

          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
