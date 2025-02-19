import { BannerAvatarFormProps } from "@/types/types";
import { BannerForm } from "./BannerForm";
import { AvatarForm } from "./AvatarForm";

export function BannerAvatarForm({
  previewBannerUrl,
  previewAvatarUrl,
  profile,
  setBannerFile,
  setAvatarFile,
}: BannerAvatarFormProps) {
  return (
    <div className="relative w-full ">
      <BannerForm
        previewBannerUrl={previewBannerUrl}
        profile={profile}
        setBannerFile={setBannerFile}
      />

      <AvatarForm
        previewAvatarUrl={previewAvatarUrl}
        profile={profile}
        setAvatarFile={setAvatarFile}
      />
    </div>
  );
}
