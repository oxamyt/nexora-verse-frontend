import { CommentType } from "@/types/types";
import { motion } from "motion/react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { UpdateCommentForm } from "./UpdateCommentForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { useLikeCommentMutation } from "@/store/Api";

export function Comment({ comment }: { comment: CommentType }) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [likeComment] = useLikeCommentMutation();
  const isLiked = comment.likes.some((like) => like.userId === Number(userId));

  async function submitLike({ commentId }: { commentId: number }) {
    try {
      await likeComment(commentId).unwrap();
    } catch (error) {
      console.error("Error during liking comment:", error);
    }
  }

  return (
    <div className="mt-3 space-y-4">
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pl-4 border-l-2 border-custom-11"
      >
        <div className="flex items-start gap-2">
          <img
            src={comment.User.avatarUrl}
            alt={comment.User.username}
            className="w-8 h-8 mt-2 rounded-full flex-shrink-0"
          />
          <div className="flex flex-col flex-grow">
            <div className="flex items-baseline gap-2">
              <span className="text-white font-medium text-sm">
                {comment.User.username}
              </span>
              <div className="flex items-center gap-1 text-xs text-custom-5">
                <span>
                  · {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                {Number(userId) === Number(comment.User.id) && (
                  <span className="flex justify-center items-center gap-2">
                    <UpdateCommentForm comment={comment} />
                    <DeleteCommentButton commentId={comment.id} />
                  </span>
                )}
              </div>
            </div>

            <p className="text-white text-sm mt-1 leading-relaxed">
              {comment.content}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center  gap-1">
                {isLiked ? (
                  <FaHeart
                    onClick={() => submitLike({ commentId: comment.id })}
                    className="w-7 h-7 text-red-500 cursor-pointer"
                  />
                ) : (
                  <CiHeart
                    onClick={() => submitLike({ commentId: comment.id })}
                    className="w-7 h-7 text-custom-5 cursor-pointer"
                  />
                )}
                <span className="text-custom-5 text-sm">
                  {comment._count.likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
