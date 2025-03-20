import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {" "}
      {/*No BrowserRouter here */}
      {user ? (
        <>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
