import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Home() {
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
    </div>
  );
}
