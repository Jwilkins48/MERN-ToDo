import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useLogOut } from "../hooks/useLogout.jsx";

function Navbar() {
  const { user } = useAuthContext();
  const { logOut } = useLogOut();

  return (
    <nav className="flex justify-between px-20 py-9 border-b-2 mb-8">
      <a className="text-3xl font-bold" href="/">
        ToDo
      </a>

      <div className="flex gap-2">
        {!user ? (
          <ul className="flex gap-2">
            <li>
              <a href="/signUp">Sign Up</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        ) : (
          <div className="flex items-center gap-3">
            <p>{user?.email}</p>
            <button
              className="border-2 px-2 py-1 rounded border-secondary"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
