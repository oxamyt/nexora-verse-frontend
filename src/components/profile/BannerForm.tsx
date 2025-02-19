import { BannerFormProps } from "@/types/types";

export function BannerForm({
  previewBannerUrl,
  profile,
  setBannerFile,
}: BannerFormProps) {
  return (
    <div className="relative h-64 w-full cursor-pointer">
      <label className="block h-full w-full cursor-pointer">
        <div
          className={`h-full w-full bg-cover bg-center ${
            !previewBannerUrl && !profile.bannerUrl ? "bg-custom-3" : ""
          }`}
          style={{
            backgroundImage:
              previewBannerUrl || profile.bannerUrl
                ? `url(${previewBannerUrl || profile.bannerUrl})`
                : undefined,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white">Change Banner</span>
          </div>
        </div>
        <input
          type="file"
          name="banner"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && setBannerFile(e.target.files[0])
          }
          className="hidden"
        />
      </label>
    </div>
  );
}
