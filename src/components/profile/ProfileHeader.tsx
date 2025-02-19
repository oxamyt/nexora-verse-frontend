import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader({
  avatarUrl,
  bannerUrl,
}: {
  avatarUrl: string;
  bannerUrl?: string;
}) {
  return (
    <div className="relative">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Profile banner"
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full bg-custom-8" />
      )}

      <motion.div
        className="absolute -bottom-16 left-4"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
      >
        <Avatar className="w-32 h-32 border-2 border-custom-4">
          <AvatarImage src={avatarUrl} alt="Profile avatar" />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
  );
}
