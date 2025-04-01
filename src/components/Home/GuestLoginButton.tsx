import { useGuestLoginMutation } from "@/store/Api";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { FaPerson } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function GuestLoginButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [guestLogin, { isLoading }] = useGuestLoginMutation();

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
      className="bg-gradient-to-r flex justify-center items-center from-orange-400 via-pink-500 to-purple-500 mt-2 text-white font-bold text-lg py-4 px-4 rounded-lg text-center w-64"
    >
      {isLoading ? (
        <>
          {" "}
          <FaPerson className="w-7 h-7" /> Guest User{" "}
          <AiOutlineLoading3Quarters className="animate-spin ml-1" />
        </>
      ) : (
        <>
          {" "}
          <FaPerson className="w-7 h-7" /> Guest User
        </>
      )}
    </button>
  );
}
