import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  async function clickHandler(e) {
    try {
      const result = await authService.logout();
      dispatch(logout());
      console.log("session ended: ", result);
    } catch (error) {
      console.error("LogoutBtn.clickHandler:: ", error);
    }
  }

  return (
    <button className="logout" onClick={clickHandler}>
      Logout
    </button>
  );
}

export default LogoutBtn;
