import { motion } from "motion/react";
import { ProfileForm } from "@/pages/Profile/ProfileForm";
import { ProfileDetailsProps } from "@/types/types";
import { useFollowMutation } from "@/store/Api";
import { useState } from "react";
import { useEffect } from "react";

export function ProfileDetails({
  profile,
  isProfileOwner,
  setProfile,
}: ProfileDetailsProps) {
  const [follow, { isLoading }] = useFollowMutation();
  const [isFollowing, setIsFollowing] = useState(profile.isFollowedByRequester);

  useEffect(() => {
    setIsFollowing(profile.isFollowedByRequester);
  }, [profile.isFollowedByRequester]);

  async function toggleFollow() {
    try {
      await follow(profile.id);

      if (isFollowing) {
        setProfile((prev) => ({
          ...prev,
          followers: prev.followers - 1,
        }));
      } else {
        setProfile((prev) => ({
          ...prev,
          followers: prev.followers + 1,
        }));
      }

      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error during following:", error);
    }
  }

  return (
    <div className="pt-20 px-4">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-2xl text-custom-9 font-bold">
            {profile.username}
          </h1>
        </div>
        {isProfileOwner ? (
          <ProfileForm profile={profile} setProfile={setProfile} />
        ) : (
          <motion.button
            className={`${
              isFollowing ? "bg-custom-4" : "bg-custom-2"
            } text-custom-9 rounded-full  text-xl font-bold px-4 py-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFollow}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
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
          <span className="font-bold text-custom-9">{profile.following}</span>
          <span className="text-custom-5">Following</span>
        </div>
        <div className="flex gap-1">
          <span className="font-bold text-custom-9">{profile.followers}</span>
          <span className="text-custom-5">Followers</span>
        </div>
        <div className="flex gap-1">
          <span className="font-bold text-custom-9">{profile.posts}</span>
          <span className="text-custom-5">Posts</span>
        </div>
      </motion.div>
    </div>
  );
}
