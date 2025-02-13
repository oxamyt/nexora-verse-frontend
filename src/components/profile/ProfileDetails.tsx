import { motion } from "motion/react";
import { ProfileForm } from "@/pages/Profile/ProfileForm";
import { ProfileDetailsProps } from "@/types/types";

export function ProfileDetails({
  profile,
  isProfileOwner,
  setProfile,
}: ProfileDetailsProps) {
  return (
    <div className="pt-20 px-4">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
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
  );
}
