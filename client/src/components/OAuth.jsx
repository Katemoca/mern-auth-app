import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice/userSlice.js";

const OAuth = () => {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result); // We need three things the username(displayName), the url of the image(photoURL), and the email(email)
      const res = await fetch("/server/auth/google", {
        //! It's important to await the fetch as it is a promise.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName, // These have to match the properties that the correspondent model has.
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("Could not login with Google ", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick} // Event
      className="text-white bg-fuchsia-900 rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-40 shadow-md shadow-black">
      SIGN IN WITH GOOGLE
    </button>
  );
};

export default OAuth;
