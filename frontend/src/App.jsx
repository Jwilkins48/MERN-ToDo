import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
