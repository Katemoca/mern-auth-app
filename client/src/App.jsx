import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Profile from "./views/Profile";
import Header from "./components/Header.jsx/Header";
import PrivateRoute from "./components/Profile/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          {/* This is the conrrespondent "Outlet" component that we have to use in the PrivateRoute component */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// LINK: https://www.youtube.com/watch?v=rXvQj-Z0v0s
