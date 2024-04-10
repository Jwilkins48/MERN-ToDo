import { useAuthContext } from "../hooks/useAuthContext.jsx";

function Navbar() {
  const { user } = useAuthContext();
  return (
    <nav>
      <a href="/">ToDo</a>

      <div>
        <div>{user?.email}</div>
        <ul>
          <li>
            <a href="/signUp">Sign Up</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
