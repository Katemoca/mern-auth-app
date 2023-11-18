import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="bg-cyan-500 h-screen">
      <div className="mx-auto p-3 max-w-lg">
        <h1 className="text-3xl text-center font-semibold my-7 text-white">
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
