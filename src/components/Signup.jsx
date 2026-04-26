import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import Button from "./Button";

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submit(data) {
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const user = await authService.getCurrentUser();
        dispatch(login(user));
        navigate("/");
      }
    } catch (error) {
      console.error("Signup.submit:: ", error);
      // throw error;
    }
  }

  return (
    <div className="signup">
      <div>
        Already have an account! <Link to="/login">Login</Link>
      </div>

      <form className="signupForm" onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          placeholder="Enter your full Name"
          {...register("name")}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          required
        />
        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
}

export default Signup;
