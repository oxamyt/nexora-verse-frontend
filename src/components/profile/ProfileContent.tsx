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
              ? " text-custom-9 border-b"
              : "text-custom-5 hover:text-black"
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
              ? " text-custom-9 border-b"
              : "text-custom-5 hover:text-black"
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
