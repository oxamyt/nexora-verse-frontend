import { motion } from "motion/react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-1">
      <main className="w-full flex-grow pb-14">
        {" "}
        <motion.div
          className="max-w-full h-screen flex flex-col items-center justify-center mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <MdError className="text-red-600 w-8 h-8" />
          <p className="text-center text-xl font-bold text-red-600">
            Oops, page not found.
          </p>
          <Link
            to="/"
            className="p-3 mt-5 font-bold text-lg text-white bg-custom-2 rounded-lg"
          >
            Back to homepage
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
