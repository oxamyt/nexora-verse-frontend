import { PostCardProps } from "@/types/types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function PostCard({ post, user }: PostCardProps) {
  return (
    <motion.div
      key={post.id}
      className="bg-custom-1 border-b border-custom-11 p-4 "
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
            <span className="font-semibold text-custom-9">
              <Link to={`/profile/${user.id}`}> {user.username}</Link>
            </span>
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
        </div>
      </div>
    </motion.div>
  );
}
