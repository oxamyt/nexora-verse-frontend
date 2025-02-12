import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileForm } from "./ProfileForm";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "@/store/Api";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { SkeletonProfile } from "@/features/skeletonCards/skeletonProfile";
import { MdError } from "react-icons/md";

export function Profile() {
  enum PostCategories {
    POSTS,
    LIKED_POSTS,
  }

  const [activePostCategory, setActivePostCategory] = useState(
    PostCategories.POSTS
  );

  const { id } = useParams();
  const { data: userProfile, isLoading } = useProfileQuery(id);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const isProfileOwner = userId === id;

  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    avatarUrl: "",
    followers: 0,
    following: 0,
    posts: 0,
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        username: userProfile.username,
        bio: userProfile.bio,
        avatarUrl: userProfile.avatarUrl || "",
        followers: userProfile._count.followers,
        following: userProfile._count.following,
        posts: userProfile._count.posts,
      });
    }
  }, [userProfile]);

  if (isLoading) {
    return <SkeletonProfile />;
  }

  if (!userProfile) {
    return (
      <motion.div
        className="max-w-full h-screen flex flex-col items-center justify-center mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <MdError className="text-red-600 w-8 h-8" />
        <p className="text-center text-xl font-bold text-red-600">
          Oops, profile not found.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-full mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-48 bg-custom-4 relative">
        <motion.div
          className="absolute -bottom-16 left-4"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <Avatar className="w-32 h-32 border-4 border-custom-9">
            <AvatarImage src={profile.avatarUrl} alt="Profile avatar" />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
        </motion.div>
      </div>

      <div className="pt-20 px-4">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-4xl font-bold">{profile.username}</h1>
          </div>
          {isProfileOwner ? (
            <ProfileForm profile={profile} setProfile={setProfile} />
          ) : (
            <motion.button
              className="bg-custom-9 rounded-full text-custom-8 text-xl font-bold px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow
            </motion.button>
          )}
        </motion.div>

        <motion.div
          className="mt-4 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex gap-1">
            <span className="font-bold">{profile.following}</span>
            <span className="text-gray-600">Following</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{profile.followers}</span>
            <span className="text-gray-600">Followers</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{profile.posts}</span>
            <span className="text-gray-600">Posts</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-4 border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="px-4 space-x-4">{profile.bio}</p>
        <div className="flex justify-around">
          <motion.button
            className={`px-4 py-4 font-bold ${
              activePostCategory === PostCategories.POSTS
                ? "border-b-2 border-black"
                : "text-gray-500 hover:text-black"
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
                ? "border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePostCategory(PostCategories.LIKED_POSTS)}
          >
            Liked Posts
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
