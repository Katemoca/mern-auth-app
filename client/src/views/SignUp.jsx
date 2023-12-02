import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  // Be aware of CORS allowance as the URL for both front-end and back-end is going to be the same let's use a proxy during production. Go to the vite.js configuration file and add the proxy.

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("/server/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      // setError(false); // This is because sometimes we ave an error from the previous request so we want to remove that as well.
      // We have to check if the data of the response has an error before setting the setError
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-purple-300 to-100% h-screen pt-8">
      <div className="mx-auto p-8 max-w-lg bg-black rounded-3xl">
        <h1 className="text-3xl text-center font-semibold my-4 text-white">
          Sign Up
        </h1>
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 p-3 rounded-lg shadow-md shadow-black"
            onChange={handleChange}></input>
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
            {loading ? "Sending information..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p className="text-zinc-50">I already have an account</p>
          <Link to="/sign-in">
            <span className="text-indigo-500 hover:text-white">Sign In</span>
          </Link>
        </div>
        <p className="text-indigo-500 mt-5">
          {error && "Something went wrong"}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
