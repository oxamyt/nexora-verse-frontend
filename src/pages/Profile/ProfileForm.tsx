import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchema } from "@/utils/validation/schemas";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUpdateProfileMutation } from "@/store/Api";
import { ProfileState } from "@/types/types";
import { isErrorData } from "@/types/ErrorDataTypes";
import { useEffect } from "react";
import { useUpdateAvatarMutation } from "@/store/Api";
import { useUpdateBannerMutation } from "@/store/Api";
import { BannerAvatarForm } from "@/components/profile/BannerAvatarForm";

export function ProfileForm({
  profile,
  setProfile,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
}) {
  const [open, setOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);

  const [updateProfile, { isLoading: isUpdatingProfile, error: profileError }] =
    useUpdateProfileMutation();
  const [updateAvatar, { isLoading: isUpdatingAvatar, error: avatarError }] =
    useUpdateAvatarMutation();
  const [updateBanner, { isLoading: isUpdatingBanner, error: bannerError }] =
    useUpdateBannerMutation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    form.reset({
      username: profile.username || "",
      bio: profile.bio || "",
    });
    setAvatarFile(null);
    setBannerFile(null);
    setPreviewUrl(null);
    setPreviewBannerUrl(null);
  }, [profile, form]);

  useEffect(() => {
    if (bannerFile) {
      const objectUrl = URL.createObjectURL(bannerFile);
      setPreviewBannerUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewBannerUrl(null);
    }
  }, [bannerFile]);

  useEffect(() => {
    if (avatarFile) {
      const objectUrl = URL.createObjectURL(avatarFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [avatarFile]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const updates: Partial<z.infer<typeof profileSchema>> = {};
    if (values.username && values.username !== profile.username) {
      updates.username = values.username;
    }
    updates.bio = values.bio;

    try {
      const updateResult = await updateProfile(updates).unwrap();

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        const avatarResult = await updateAvatar(formData).unwrap();
        setProfile((prev) => ({
          ...prev,
          avatarUrl: avatarResult?.avatarUrl || prev.avatarUrl,
        }));
      }

      if (bannerFile) {
        const bannerFormData = new FormData();
        bannerFormData.append("banner", bannerFile);
        const bannerResult = await updateBanner(bannerFormData).unwrap();
        setProfile((prev) => ({
          ...prev,
          bannerUrl: bannerResult?.bannerUrl || prev.bannerUrl,
        }));
      }

      setProfile((prev) => ({
        ...prev,
        username: updateResult.updatedUser?.username ?? prev.username,
        bio: updateResult.updatedProfile?.bio ?? prev.bio,
      }));

      setOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen)
          form.reset({
            username: profile.username || "",
            bio: profile.bio || "",
          });
        setAvatarFile(null);
      }}
    >
      <DialogTrigger asChild>
        <motion.button
          className="bg-custom-8 text-xl text-custom-4 rounded-full font-bold px-4 py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Edit Profile
        </motion.button>
      </DialogTrigger>
      <DialogContent className="bg-custom-1 border-none ">
        <DialogHeader>
          <DialogTitle className="text-custom-9">Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-custom-1 max-w-full mx-auto p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            encType="multipart/form-data"
          >
            <BannerAvatarForm
              previewBannerUrl={previewBannerUrl}
              previewAvatarUrl={previewUrl}
              profile={profile}
              setBannerFile={setBannerFile}
              setAvatarFile={setAvatarFile}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-custom-5 font-bold text-lg">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="p-6 text-custom-5 bg-custom-3 text-lg border-custom-4 focus:border-custom-2 focus:outline-none"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-md bg-red-600  text-white p-3 rounded-lg" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-custom-5 font-bold text-lg">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="pl-6 bg-custom-3 text-custom-5 text-lg border border-custom-4 focus:border-custom-2 focus:outline-none rounded-lg w-full"
                      placeholder="Enter your bio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-md bg-red-600  text-white p-3 rounded-lg" />
                </FormItem>
              )}
            />

            {(profileError || avatarError || bannerError) && (
              <div className="text-md bg-red-600 text-white p-3 rounded-lg">
                <p>
                  {profileError &&
                    "data" in profileError &&
                    isErrorData(profileError.data) &&
                    profileError.data.error}
                  {avatarError &&
                    "data" in avatarError &&
                    isErrorData(avatarError.data) &&
                    avatarError.data.error}
                  {bannerError &&
                    "data" in bannerError &&
                    isErrorData(bannerError.data) &&
                    bannerError.data.error}
                </p>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-custom-2 text-xl font-bold p-8 w-full"
                type="submit"
              >
                {isUpdatingProfile || isUpdatingAvatar || isUpdatingBanner
                  ? "Updating profile..."
                  : "Submit ♥‿♥"}
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
