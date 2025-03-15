import { useParams } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { SkeletonPostCard } from "@/features/skeletonCards/SkeletonPost";
import { motion } from "motion/react";
import { useGetPostByIdQuery, useLikePostMutation } from "@/store/Api";
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { EditPostForm } from "@/components/post/EditPostForm";
import { DeletePostButton } from "@/components/post/DeletePostButton";
import { CommentsForm } from "@/components/comment/CommentsForm";
import { Comment } from "@/components/comment/Comment";
import { CommentType } from "@/types/types";

export function PostPage() {
  const { postId } = useParams();
  const { data: postData, isLoading, isFetching } = useGetPostByIdQuery(postId);

  const [post, setPost] = useState<any>(null);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [likePost] = useLikePostMutation();

  useEffect(() => {
    if (postData) {
      setPost(postData);
    }
  }, [postData]);

  const isLiked = post?.likes.some(
    (like: { userId: number }) => like.userId === Number(userId)
  );

  async function submitLike(postId: number) {
    try {
      await likePost(postId);
    } catch (error) {
      console.error("Error during liking post:", error);
    }
  }

  if (isLoading || isFetching) return <SkeletonPostCard />;
  if (!post) return <div>Post not found</div>;

  return (
    <motion.div
      key={post.id}
      className="bg-custom-1 w-full max-w-4xl mx-auto p-4 lg:mt-64 lg:p-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-start gap-3">
        <img
          src={post.User.avatarUrl}
          alt={post.User.username}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />

        <div className="flex flex-col flex-grow">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-semibold text-base">
              {post.User.username}
            </span>

            {post.createdAt && (
              <span className="text-custom-5 text-sm ml-2">
                ·{" "}
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

          <div className="mt-3 space-y-2">
            <h3 className="font-semibold text-xl text-custom-9">
              {post.title}
            </h3>
            <p className="text-lg text-white break-words leading-relaxed">
              {post.body}
            </p>
            {post.imageUrl && (
              <motion.div
                className="mt-4 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={post.imageUrl}
                  alt="Post content"
                  className="w-full max-h-96 object-contain rounded-lg cursor-pointer "
                />
              </motion.div>
            )}
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

          <div className="flex items-center justify-between gap-5 mt-4 pt-4 mr-4">
            <div className="flex items-center justify-start gap-8">
              <div className="flex items-center justify-center gap-2">
                <FaRegCommentAlt className="w-7 h-7 text-custom-5 cursor-pointer" />
                <p className="font-bold text-custom-5 text-2xl">
                  {post._count.comments}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <motion.div transition={{ duration: 0.3 }}>
                  {isLiked ? (
                    <FaHeart
                      onClick={() => submitLike(post.id)}
                      className="w-9 h-9 text-red-500 cursor-pointer"
                    />
                  ) : (
                    <CiHeart
                      onClick={() => submitLike(post.id)}
                      className="w-9 h-9 text-custom-5 cursor-pointer"
                    />
                  )}
                </motion.div>
                <p className="font-bold text-custom-5 text-2xl">
                  {post._count.likes}
                </p>
              </div>
            </div>

            {Number(userId) === Number(post.User.id) && (
              <div className="flex items-center justify-start gap-5">
                <EditPostForm post={post} />
                <DeletePostButton postId={post.id} />
              </div>
            )}
          </div>

          <CommentsForm postId={post.id} />
          {post.comments.map((comment: CommentType) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
