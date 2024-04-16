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
        <h3>Sign Up</h3>
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

        <button className="form-btn" disabled={isLoading}>
          Submit
        </button>
        {error && <div className="error mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
