import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarFormProps } from "@/types/types";

export function AvatarForm({
  previewUrl,
  profile,
  setAvatarFile,
}: AvatarFormProps) {
  return (
    <div className="flex items-center  cursor-pointer justify-center ">
      <label className="cursor-pointer">
        <Avatar className="w-32 h-32 border-2 border-custom-4">
          <AvatarImage
            src={previewUrl || profile.avatarUrl}
            alt="Profile avatar"
          />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setAvatarFile(e.target.files[0]);
            }
          }}
          className="hidden"
        />
      </label>
    </div>
  );
}
