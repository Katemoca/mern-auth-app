import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, [event.target.id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="mx-auto p-3 max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}></input>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}></input>
        <button className="bg-neutral-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-40">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>I already have an account</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
