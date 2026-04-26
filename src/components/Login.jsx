import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import Button from "./Button";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  async function submit({ email, password }) {
    try {
      setError("");
      const session = await authService.login({ email, password });
      if (session) {
        const user = await authService.getCurrentUser();
        dispatch(login(user));
        navigate("/");
      }
    } catch (error) {
      console.error("Login:: Unable to login:: ", error);
      setError(error.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="login">
      <div>
        Need an Account? <Link to={"/signup"}>Signup</Link>
        {error && <p style={{ color: "red" }}> {error}</p>}
      </div>
      <form action="submit" onSubmit={handleSubmit(submit)}>
        <input
          type="email"
          {...register("email")}
          placeholder="Type your email"
          required
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Type your password"
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
