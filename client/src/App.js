import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { GoogleLogin } from "./components/GoogleLogin";
// import { GoogleLogin } from "./components/GoogleLogin";
// import Goo from "./components/GoogleLogin";
// import IdTokenGenerator from "./components/GenerateToken";
// import GoogleAuth from "./components/GoogleAuth";

function App() {
  return (
    <div className="App">
    <GoogleLogin/>
    {/* <IdTokenGenerator/> */}
    </div>
  );
}

export default App;
