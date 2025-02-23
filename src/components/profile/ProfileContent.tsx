import { motion } from "motion/react";
import { ProfileContentProps } from "@/types/types";
import { useGetPostsByUserIdQuery } from "@/store/Api";
import { useParams } from "react-router-dom";
import { PostCard } from "../post/PostCard";
import { Post } from "@/types/types";
import { SkeletonPostCard } from "@/features/skeletonCards/SkeletonPost";

export function ProfileContent({
  activePostCategory,
  setActivePostCategory,
  PostCategories,
}: ProfileContentProps) {
  const { id } = useParams();
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
    isFetching,
  } = useGetPostsByUserIdQuery(id);

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

      {activePostCategory === PostCategories.POSTS && (
        <div className="mt-4">
          {postsLoading || isFetching ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                <SkeletonPostCard key={index} />
              ))}
            </div>
          ) : postsError ? (
            <div>Error loading posts.</div>
          ) : posts && posts.length > 0 ? (
            posts.map((post: Post) => (
              <PostCard
                key={post.id}
                post={post}
                user={{
                  id: post.User.id,
                  username: post.User.username,
                  avatarUrl: post.User.avatarUrl,
                }}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}
