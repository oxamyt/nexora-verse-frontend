import { useGetRecentPostsQuery, useGetFollowingPostsQuery } from "@/store/Api";
import { motion } from "motion/react";
import { FeedPostCategories } from "@/types/types";
import { useState, useEffect, useRef } from "react";
import { SkeletonPostCard } from "@/features/skeletonCards/SkeletonPost";
import { Post } from "@/types/types";
import { PostCard } from "@/components/post/PostCard";

export function Feed() {
  const {
    data: recentPosts,
    isLoading: isLoadingRecent,
    isFetching: isFetchingRecent,
    error: errorRecent,
  } = useGetRecentPostsQuery({});

  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsHeaderHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        const scrollingDown = currentScrollY > lastScrollY.current;
        setIsHeaderHidden(scrollingDown);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    data: followingPosts,
    isLoading: isLoadingFollowing,
    isFetching: isFetchingFollowing,
    error: errorFollowing,
  } = useGetFollowingPostsQuery({});

  const [activePostCategory, setActivePostCategory] =
    useState<FeedPostCategories>(FeedPostCategories.RECENT_POSTS);

  const isLoading =
    activePostCategory === FeedPostCategories.RECENT_POSTS
      ? isLoadingRecent || isFetchingRecent
      : isLoadingFollowing || isFetchingFollowing;

  const error =
    activePostCategory === FeedPostCategories.RECENT_POSTS
      ? errorRecent
      : errorFollowing;

  return (
    <>
      <div
        ref={headerRef}
        className={`sticky top-0 z-10 bg-custom-1 backdrop-blur-sm transition-transform duration-300 ${
          isHeaderHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex justify-around shadow-sm">
          <motion.button
            className={`px-4 py-4 font-bold text-lg relative ${
              activePostCategory === FeedPostCategories.RECENT_POSTS
                ? "text-custom-9"
                : "text-custom-5 hover:text-custom-8"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setActivePostCategory(FeedPostCategories.RECENT_POSTS)
            }
          >
            Recent
            {activePostCategory === FeedPostCategories.RECENT_POSTS && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-custom-2"
                layoutId="feed-underline"
              />
            )}
          </motion.button>

          <motion.button
            className={`px-4 py-4 font-bold text-lg relative ${
              activePostCategory === FeedPostCategories.FOLLOWING_POSTS
                ? "text-custom-9"
                : "text-custom-5 hover:text-custom-8"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setActivePostCategory(FeedPostCategories.FOLLOWING_POSTS)
            }
          >
            Following
            {activePostCategory === FeedPostCategories.FOLLOWING_POSTS && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-custom-2"
                layoutId="feed-underline"
              />
            )}
          </motion.button>
        </div>
      </div>

      <div className="pb-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <SkeletonPostCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex items-center justify-center text-white font-bold">
            Error loading posts.
          </div>
        ) : (
          <>
            {activePostCategory === FeedPostCategories.RECENT_POSTS ? (
              recentPosts && recentPosts.length > 0 ? (
                recentPosts.map((post: Post) => (
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
                <div className="flex items-center justify-center text-white font-bold">
                  No recent posts.
                </div>
              )
            ) : followingPosts && followingPosts.length > 0 ? (
              followingPosts.map((post: Post) => (
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
              <div className="flex items-center justify-center text-white font-bold">
                No posts from followed users.
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
