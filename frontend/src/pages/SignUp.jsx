import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isLoading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-secondary enterForm"
      >
        <h3>Welcome!</h3>
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
            Sign Up
          </button>
          <hr className="h-px bg-secondary mt-8 m-auto border-0  w-[60%]"></hr>
          <a className="flex justify-center mt-4 pt-1" href="/login">
            Sign In
          </a>
        </div>

        {/* <button className="form-btn" disabled={isLoading}>
          Submit
        </button>
        {error && <div className="error mt-2">{error}</div>} */}
      </form>
    </div>
  );
}

export default SignUp;
