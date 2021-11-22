import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LearnReact from "./components/LearnReact";
import { Image } from "cloudinary-react";
import "./styles/App.css"


function App() {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`

  const [logged, setLogged] = useState(false);
  const [uploadInfo, setUploadInfo] = useState("");
  const [status, setStatus] = useState("pending");
  const [displayImage, setDisplayImage] = useState("");

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
      formData.append("upload_preset", "ofd7rhpu")

      const sendCloudinary = async () => {
        setStatus("Loading");
        try {
          const res = await fetch(url, {
            method: "POST",
            body: formData
          })
          const data = await res.json();
          console.log("Data", data)
          setDisplayImage(data)
          setStatus("resolved")
        } catch (error) {
          console.error(error)
        }
      }
      console.log(status)
      sendCloudinary();
    }

    return (
      <>
        <h1>Create</h1>
        <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={displayImage ? displayImage?.public_id : ""} />
        <input type="file" onChange={(event) => { setUploadInfo(event.target.files[0]) }} />
        <button onClick={handleUpload}>Upload</button>
        {uploadInfo ? <h6>{Math.round(uploadInfo.size / 1000000)}MB</h6> : ""}
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
