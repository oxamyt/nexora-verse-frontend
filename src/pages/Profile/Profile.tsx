import { useState } from "react";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "@/store/Api";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { SkeletonProfile } from "@/features/skeletonCards/skeletonProfile";
import { ProfileError } from "@/components/profile/ProfileError";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { ProfileState } from "@/types/types";
import { PostCategories } from "@/types/types";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { PostForm } from "@/components/post/PostForm";

export function Profile() {
  const [activePostCategory, setActivePostCategory] = useState<PostCategories>(
    PostCategories.POSTS
  );
  const [profile, setProfile] = useState<ProfileState>({
    id: 0,
    username: "",
    bio: "",
    avatarUrl: "",
    bannerUrl: "",
    isGuest: false,
    followers: 0,
    following: 0,
    posts: 0,
    isFollowedByRequester: false,
  });

  const { id } = useParams();

  const { data: userProfile, isLoading } = useProfileQuery(id);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isProfileOwner = Number(userId) === Number(id);

  useEffect(() => {
    if (userProfile) {
      setProfile({
        id: userProfile.id,
        username: userProfile.username,
        bio: userProfile.profile.bio,
        avatarUrl: userProfile.avatarUrl || "",
        bannerUrl: userProfile.profile.bannerUrl || "",
        followers: userProfile._count.followers,
        isGuest: userProfile.isGuest,
        following: userProfile._count.following,
        posts: userProfile._count.posts,
        isFollowedByRequester: userProfile.isFollowedByRequester,
      });
    }
  }, [userProfile]);

  if (isLoading) {
    return <SkeletonProfile />;
  }

  if (!userProfile) {
    return <ProfileError />;
  }

  return (
    <motion.div
      className="max-w-full mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ProfileHeader
        avatarUrl={profile.avatarUrl}
        bannerUrl={profile.bannerUrl}
      />

      <ProfileDetails
        profile={profile}
        isProfileOwner={isProfileOwner}
        setProfile={setProfile}
      />

      <p className="px-4 text-custom-9 space-x-4 break-words overflow-hidden">
        {profile.bio}
      </p>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ProfileContent
          activePostCategory={activePostCategory}
          setActivePostCategory={setActivePostCategory}
          PostCategories={PostCategories}
        />
      </motion.div>

      <PostForm />
    </motion.div>
  );
}
