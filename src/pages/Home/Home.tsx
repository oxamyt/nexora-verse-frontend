import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/authSlice";
import { GuestLoginButton } from "@/components/Home/GuestLoginButton";
const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("token");
    const userId = params.get("userId");

    if (token && userId) {
      localStorage.setItem("token", token);
      dispatch(setUser(userId));
      window.history.replaceState({}, document.title, window.location.pathname);

      navigate(`/profile/${userId}`);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-custom-1">
      <motion.img
        src="/galaxy.png"
        className="w-32"
        whileTap={{ scale: 1.2 }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          },
        }}
      />
      <h1 className="text-4xl font-bold text-white mb-8">Nexora</h1>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/auth/signup"
          className="bg-custom-2 text-white text-lg font-bold py-2 px-4 rounded-lg block text-center mb-4 w-64"
        >
          Create Account
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/auth/login"
          className="bg-custom-3 text-custom-4 text-lg font-bold py-2 px-4 rounded-lg block text-center w-64"
        >
          Login
        </Link>
      </motion.div>
      <p className="flex items-center w-64 text-custom-9 font-bold my-2">
        <span className="flex-1 border-t border-custom-9"></span>
        <span className="px-4">or</span>
        <span className="flex-1 border-t border-custom-9"></span>
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
        <a
          href={`${API}/auth/github`}
          className="bg-custom-9 py-3 text-custom-3 text-lg font-bold   rounded-lg  text-center w-64 flex items-center justify-center gap-2 hover:text-custom-9 hover:bg-custom-3"
        >
          <FaGithub className="w-8 h-8" />
          Sign up with Github
        </a>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
        <GuestLoginButton />
      </motion.div>
    </div>
  );
}
