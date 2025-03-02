import { motion } from "motion/react";
import { ProfileContentProps } from "@/types/types";
import { useGetPostsByUserIdQuery, useGetLikedPostsQuery } from "@/store/Api";
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
    isFetching: isPostsFetching,
  } = useGetPostsByUserIdQuery(id);
  const {
    data: likedPosts,
    isLoading: likedPostsLoading,
    error: likedPostsError,
    isFetching: isLikedPostsFetching,
  } = useGetLikedPostsQuery(id);

  return (
    <>
      <div className="flex justify-around">
        <motion.button
          className={`px-4 py-4 font-bold  relative ${
            activePostCategory === PostCategories.POSTS
              ? " text-custom-9 "
              : "text-custom-5 "
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActivePostCategory(PostCategories.POSTS)}
        >
          My Posts
          {activePostCategory === PostCategories.POSTS && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-custom-2"
              layoutId="profile-underline"
            />
          )}
        </motion.button>
        <motion.button
          className={`px-4 py-4 font-bold relative ${
            activePostCategory === PostCategories.LIKED_POSTS
              ? " text-custom-9 "
              : "text-custom-5 "
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActivePostCategory(PostCategories.LIKED_POSTS)}
        >
          Liked Posts
          {activePostCategory === PostCategories.LIKED_POSTS && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-custom-2"
              layoutId="profile-underline"
            />
          )}
        </motion.button>
      </div>

      {activePostCategory === PostCategories.POSTS && (
        <div className="mt-4">
          {postsLoading || isPostsFetching ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                <SkeletonPostCard key={index} />
              ))}
            </div>
          ) : likedPostsError ? (
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

      {activePostCategory === PostCategories.LIKED_POSTS && (
        <div className="mt-4">
          {likedPostsLoading || isLikedPostsFetching ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                <SkeletonPostCard key={index} />
              ))}
            </div>
          ) : postsError ? (
            <div>Error loading liked posts.</div>
          ) : likedPosts && likedPosts.length > 0 ? (
            likedPosts.map((post: Post) => (
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
