import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

// We use the actions created in the userSlice file
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/userSlice/userSlice";

// To dispatch the actions we need to use useDispatch()
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { error, loading } = useSelector((state) => state.user);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  // Be aware of CORS allowance as the URL for both front-end and back-end is going to be the same let's use a proxy during production. Go to the vite.js configuration file and add the proxy.

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInStart()); // this has the loading in true
      const response = await fetch("/server/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-purple-300 to-100% h-screen pt-8">
      <div className="bg-black mx-auto p-8 rounded-3xl max-w-lg">
        <h1 className="text-3xl text-center font-semibold my-4 text-white">
          Sign In
        </h1>
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 p-3 rounded-lg shadow-md shadow-black"
            onChange={handleChange}></input>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 p-3 rounded-lg shadow-md shadow-black"
            onChange={handleChange}></input>
          <button
            disabled={loading}
            className="bg-indigo-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-40 shadow-md shadow-black">
            {loading ? "Sending information..." : "Sign In"}
          </button>
          <div className="flex gap-2 mt-1 text-white pl-80">
            <p>{`Forgot Password?`}</p>
          </div>
          <div className="flex justify-center items-center mt-4">
            <hr className="border-gray-300 w-1/4"></hr>
            <p className="mx-4 text-gray-300">OR</p>
            <hr className="border-gray-300 w-1/4"></hr>
          </div>
          <OAuth />
        </form>
        <div>
          <br className="text-white"></br>
        </div>
        <div className="flex gap-2 mt-5">
          <p className="text-zinc-50">{`I don't have an account`}</p>
          <Link to="/sign-up">
            <span className="text-indigo-500 hover:text-white">Sign Up</span>
          </Link>
        </div>
        <p className="text-white mt-5">
          {error ? error.message || "Something went wrong" : ""}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
