import { useParams } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { SkeletonPostCard } from "@/features/skeletonCards/SkeletonPost";
import { motion } from "motion/react";
import { useGetPostByIdQuery } from "@/store/Api";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { EditPostForm } from "@/components/post/EditPostForm";
import { DeletePostButton } from "@/components/post/DeletePostButton";

export function PostPage() {
  const { postId } = useParams();
  const { data: post, isLoading, isFetching } = useGetPostByIdQuery(postId!);
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (isLoading || isFetching) return <SkeletonPostCard />;
  if (!post) return <div>Post not found</div>;

  return (
    <motion.div
      key={post.id}
      className="bg-custom-1 border-b border-custom-11  p-4  shadow-sm"
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
            <span className="text-custom-5 text-sm">
              @{post.User.username.toLowerCase().replace(/\s+/g, "")}
            </span>
            {post.createdAt && (
              <span className="text-custom-5 text-sm ml-2">
                · {new Date(post.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="mt-3 space-y-2">
            <h3 className="font-semibold text-xl text-custom-9">
              {post.title}
            </h3>
            <p className="text-[15px] text-white break-words leading-relaxed">
              {post.body}
            </p>
          </div>

          {post.updatedAt !== post.createdAt && (
            <div className="mt-3 text-xs text-custom-5">
              Updated: {new Date(post.updatedAt).toLocaleDateString()}
            </div>
          )}

          <div className="flex items-center justify-between gap-5 mt-4 pt-4 mr-4 ">
            <div className="flex items-center justify-start gap-8 ">
              <div className="flex items-center justify-center gap-2 ">
                <FaRegCommentAlt className="w-7 h-7 text-custom-5 cursor-pointer" />
                <p className="font-bold text-custom-5 text-2xl">
                  {post._count.comments}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 ">
                <CiHeart className="w-10 h-10 text-custom-5 cursor-pointer" />
                <p className="font-bold text-custom-5 text-2xl">
                  {post._count.likes}
                </p>
              </div>
            </div>
            {Number(userId) === Number(post.User.id) && (
              <div className="flex items-center justify-start  gap-5 ">
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
