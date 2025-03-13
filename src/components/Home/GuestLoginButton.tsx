import { useGuestLoginMutation } from "@/store/Api";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

export function GuestLoginButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [guestLogin] = useGuestLoginMutation();

  async function onLogin() {
    try {
      const response = await guestLogin({}).unwrap();

      if (response.token) {
        localStorage.setItem("token", response.token);

        dispatch(setUser(response.userId));
        navigate(`/profile/${response.userId}`);
      } else {
        console.error("Error: No token received");
      }
    } catch (err) {
      console.error("Error guest logging in:", err);
    }
  }

  return (
    <button
      onClick={onLogin}
      className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 mt-2 text-white font-bold text-lg py-4 px-4 rounded-lg block text-center w-64"
    >
      Guest User
    </button>
  );
}
