import { motion } from "motion/react";
import { MdError } from "react-icons/md";

export function ProfileError() {
  return (
    <motion.div
      className="max-w-full h-screen flex flex-col items-center justify-center mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <MdError className="text-red-600 w-8 h-8" />
      <p className="text-center text-xl font-bold text-red-600">
        Oops, profile not found.
      </p>
    </motion.div>
  );
}
