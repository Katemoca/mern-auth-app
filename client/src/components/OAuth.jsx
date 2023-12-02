import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";

const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="text-white bg-fuchsia-900 rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-40 shadow-md shadow-black">
      SIGN IN WITH GOOGLE
    </button>
  );
};

export default OAuth;
