import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="h-48 bg-custom-8 relative">
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
