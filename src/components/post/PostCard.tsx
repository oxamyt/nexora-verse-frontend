import { PostCardProps } from "@/types/types";
import { motion } from "motion/react";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { EditPostForm } from "@/components/post/EditPostForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";

export function PostCard({ post, user }: PostCardProps) {
  const userId = useSelector((state: RootState) => state.auth.userId);

  return (
    <motion.div
      className="bg-custom-1 border-b border-custom-11 p-4 block"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex gap-3">
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />

        <div className="w-full">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-custom-9">{user.username}</span>
            <span className="text-custom-5 text-sm">·</span>
            {post.createdAt && (
              <span className="text-custom-5 text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="mt-2 space-y-2">
            <h3 className="font-semibold text-2xl text-custom-9">
              {post.title}
            </h3>
            <p className="text-base text-white break-words">{post.body}</p>
          </div>

          {post.updatedAt !== post.createdAt && (
            <div className="mt-3 text-xs text-custom-5">
              Updated: {new Date(post.updatedAt).toLocaleDateString()}
            </div>
          )}

          <div className="flex items-center justify-between gap-5 mt-4 pt-4">
            <div className="flex items-center gap-8">
              <Link to={`/posts/${post.id}`}>
                <FaRegCommentAlt className="w-6 h-6 text-custom-5 cursor-pointer" />
              </Link>
              <CiHeart className="w-9 h-9 text-custom-5 cursor-pointer" />
            </div>

            {Number(userId) === Number(post.User.id) && (
              <div className="flex items-center gap-5">
                <EditPostForm post={post} />
                <RiDeleteBin6Line className="w-8 h-8 text-custom-5 cursor-pointer" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
