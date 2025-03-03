import { CommentType } from "@/types/types";
import { motion } from "motion/react";
import { CiHeart } from "react-icons/ci";

export function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="mt-3 space-y-4">
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className=" pl-4 border-l-2 border-custom-11"
      >
        <div className="flex items-start gap-3">
          <img
            src={comment.User.avatarUrl}
            alt={comment.User.username}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex flex-col flex-grow">
            <div className="flex items-baseline gap-2">
              <span className="text-white font-medium text-sm">
                {comment.User.username}
              </span>
              <span className="text-custom-5 text-xs">
                · {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-white text-sm mt-1 leading-relaxed">
              {comment.content}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <CiHeart className="w-5 h-5 text-custom-5 cursor-pointer" />
                <span className="text-custom-5 text-sm">
                  {comment._count?.likes || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
