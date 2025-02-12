import { motion } from "motion/react";
import { ProfileContentProps } from "@/types/types";

export function ProfileContent({
  activePostCategory,
  setActivePostCategory,
  PostCategories,
}: ProfileContentProps) {
  return (
    <>
      <div className="flex justify-around">
        <motion.button
          className={`px-4 py-4 font-bold ${
            activePostCategory === PostCategories.POSTS
              ? "border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActivePostCategory(PostCategories.POSTS)}
        >
          My Posts
        </motion.button>
        <motion.button
          className={`px-4 py-4 font-bold ${
            activePostCategory === PostCategories.LIKED_POSTS
              ? "border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActivePostCategory(PostCategories.LIKED_POSTS)}
        >
          Liked Posts
        </motion.button>
      </div>
    </>
  );
}
