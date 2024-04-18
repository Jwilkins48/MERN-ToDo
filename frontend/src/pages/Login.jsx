import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-secondary enterForm"
      >
        <h3>Welcome Back!</h3>
        {error && (
          <div className="justify-center flex text-error mt-2">{error}</div>
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <div>
          <button className="form-btn" disabled={isLoading}>
            Sign In
          </button>
          <hr className="h-px bg-secondary mt-8 m-auto border-0  w-[60%]"></hr>
          <a className="flex justify-center mt-4 pt-1" href="/signUp">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
