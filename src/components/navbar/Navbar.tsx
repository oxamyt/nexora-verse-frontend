import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function Navbar() {
  const userId = useSelector((state: RootState) => state.auth.userId);

  return (
    <>
      <motion.nav
        className="bg-custom-1 border-t border-custom-11 mx-auto px-4 py-3 items-center fixed bottom-0 w-full lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-around space-x-8">
          <Link to="/live" className="text-white ">
            <GoHomeFill className="w-8 h-8" />
          </Link>
          <Link to="/search" className="text-white ">
            <FaSearch className="w-8 h-8" />
          </Link>
          <Link to="/messages" className="text-white ">
            <IoChatbubbleEllipsesOutline className="w-8 h-8" />
          </Link>
          <Link to={`/profile/${userId}`} className="text-white ">
            <FaRegUserCircle className="w-8 h-8" />
          </Link>
        </div>
      </motion.nav>

      <motion.nav className="bg-custom-1 border-r border-custom-11 fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col justify-center ">
        <div className="flex flex-col text-2xl space-y-12 pl-6 items-start justify-center">
          <motion.div
            className="text-white hover:text-custom-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/live" className="flex items-center space-x-4">
              <GoHomeFill className="w-8 h-8" />
              <span className="hidden lg:inline-block">Live Feed</span>
            </Link>
          </motion.div>
          <motion.div
            className="text-white hover:text-custom-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/search" className=" flex items-center space-x-4">
              <FaSearch className="w-8 h-8" />
              <span className="hidden lg:inline-block">Search</span>
            </Link>
          </motion.div>
          <motion.div
            className="text-white hover:text-custom-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/messages" className=" flex items-center space-x-4">
              <IoChatbubbleEllipsesOutline className="w-8 h-8" />
              <span className="hidden lg:inline-block">Messages</span>
            </Link>
          </motion.div>
          <motion.div
            className="text-white hover:text-custom-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/profile/${userId}`}
              className="flex items-center space-x-4"
            >
              <FaRegUserCircle className="w-8 h-8" />
              <span className="hidden lg:inline-block">Profile</span>
            </Link>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}
