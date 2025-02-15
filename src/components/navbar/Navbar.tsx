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
    <motion.nav
      className="bg-custom-1 border-t border-custom-5 mx-auto px-4 py-3 items-center fixed bottom-0 w-full "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-around space-x-8">
        <Link to="/home" className="text-white ">
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
  );
}
