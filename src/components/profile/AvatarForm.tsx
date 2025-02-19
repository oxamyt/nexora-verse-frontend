import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarFormProps } from "@/types/types";
import { motion } from "motion/react";

export function AvatarForm({
  previewAvatarUrl,
  profile,
  setAvatarFile,
}: AvatarFormProps) {
  return (
    <motion.div className="absolute -bottom-8 -left-1">
      <label className="cursor-pointer">
        <Avatar className="w-24 h-24 border-2 border-custom-4">
          <AvatarImage
            src={previewAvatarUrl || profile.avatarUrl}
            alt="Profile avatar"
          />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && setAvatarFile(e.target.files[0])
          }
          className="hidden"
        />
      </label>
    </motion.div>
  );
}
