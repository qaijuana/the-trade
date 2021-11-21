import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LearnReact from "./components/LearnReact";
// import './App.css';
import "./styles/App.css"

function App() {

  const [logged, setLogged] = useState(false);
  const [uploadInfo, setUploadInfo] = useState();
  const [status, setStatus] = useState("pending");

  function handleLogin(e) {
    e.preventDefault();
    console.log("login", !logged)
    setLogged(!logged)
  }
  function handleLogout(e) {
    e.preventDefault();
    console.log("logout", logged)
    setLogged(!logged)
  }

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

  function CreateList() {

    function handleUpload(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", uploadInfo)
      formData.append("upload_preset", "string")

      const sendCloudinary = async () => {
        setStatus("Loading");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          formData
        )
        const data = res.json();
        console.log(data)
        
      }



      // const sendData = async () => {
      //   setStatus("Loading...")
      //   const res = await fetch("/api/users/new", {
      //     method: "POST",
      //     body: JSON.stringify(signUp),
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //   })
      //   const data = await res.json();
      //   console.log(data)
      // }
      // sendData();


    }

    return (
      <>
        <h1>Create</h1>
        <img src="" alt="" />
        <input type="file" onChange={(event) => { setUploadInfo(event.target.files[0]) }} />
        <button onClick={handleUpload}>Upload</button>
        {uploadInfo ? <h6>{uploadInfo}MB</h6> : ""}
      </>
    )
  }

  function NavBar() {

    function AuthUser() {

      return (
        (logged) ?
          <div className="header-2">
            <Link to={"/learn"}>Learn</Link>
            <Link to={"/login"} onClick={handleLogin}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </div>
          :
          <div className="header-2">

            <Link to={"/create"}>Add</Link>
            <Link to={"/learn"}>Learn</Link>

            <div className="header-profile">
              <Link to={"/user"}>Profile</Link>
              <Link to={"/"} onClick={handleLogout}>Logout</Link>
            </div>
          </div>
      )
    }

    return (
      <div className="header">
        <div className="header-1">
          <Link to={"/"}>Home</Link>
          <Link to={"/marketplace"}>Shop</Link>
        </div>
        <AuthUser />

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
            <Route path="/create" element={<CreateList />} />


          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
