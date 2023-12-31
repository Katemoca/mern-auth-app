import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-sky-200">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <Link to={"/"}>
          <h1 className="font-bold hover:text-purple-600">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="font-semibold hover:text-purple-600">Home</li>
          </Link>

          <Link to={"/about"}>
            <li className="font-semibold hover:text-purple-600">About</li>
          </Link>

          {/* We need to render the profile picture that we get from the backend once the user is resgistered */}
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"></img>
            ) : (
              <li className="font-semibold hover:text-purple-600">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
