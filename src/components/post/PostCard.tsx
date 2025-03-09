import { PostCardProps } from "@/types/types";
import { motion } from "motion/react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { EditPostForm } from "@/components/post/EditPostForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { DeletePostButton } from "./DeletePostButton";
import { useLikePostMutation } from "@/store/Api";
import { useState, useRef } from "react";

export function PostCard({ post, user }: PostCardProps) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [likePost] = useLikePostMutation();
  const isLikedRef = useRef(
    post.likes.some((like) => like.userId === Number(userId))
  );
  const [likeCount, setLikeCount] = useState(post._count.likes);

  async function submitLike(postId: number) {
    const previousIsLiked = isLikedRef.current;
    const previousLikeCount = likeCount;

    isLikedRef.current = !previousIsLiked;
    setLikeCount(
      previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1
    );

    try {
      await likePost(postId).unwrap();
    } catch (error) {
      isLikedRef.current = previousIsLiked;
      setLikeCount(previousLikeCount);
      console.error("Error during liking post:", error);
    }
  }

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
            <Link
              to={`/profile/${user.id}`}
              className="font-semibold text-custom-9"
            >
              {user.username}
            </Link>
            <span className="text-custom-5 text-sm">·</span>
            {post.createdAt && (
              <span className="text-custom-5 text-sm">
                {new Date(post.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
              Updated:{" "}
              {new Date(post.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-5 mt-4 pt-4">
            <div className="flex items-center gap-8">
              <Link
                className="flex items-center justify-center gap-2 "
                to={`/posts/${post.id}`}
              >
                <FaRegCommentAlt className="w-6 h-6 text-custom-5 cursor-pointer" />
                <p className="font-bold text-custom-5 text-2xl">
                  {post._count.comments}
                </p>
              </Link>
              <div className="flex items-center justify-center gap-2">
                <motion.div transition={{ duration: 0.3 }}>
                  {isLikedRef.current ? (
                    <FaHeart
                      onClick={() => submitLike(post.id)}
                      className="w-9 h-9 
                        text-red-500
                       cursor-pointer"
                    />
                  ) : (
                    <CiHeart
                      onClick={() => submitLike(post.id)}
                      className="w-9 h-9 
                  text-custom-5
                      cursor-pointer"
                    />
                  )}
                </motion.div>

                <p className="font-bold text-custom-5 text-2xl">{likeCount}</p>
              </div>
            </div>

            {Number(userId) === Number(post.User.id) && (
              <div className="flex items-center gap-5">
                <EditPostForm post={post} />
                <DeletePostButton postId={post.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
