import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isLoading } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />

      <button disabled={isLoading}>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default SignUp;
