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

export function ProfileForm({
  profile,
  setProfile,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
}) {
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    form.reset({
      username: profile.username || "",
      bio: profile.bio || "",
    });
  }, [profile, form]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const updates: Partial<z.infer<typeof profileSchema>> = {};
    if (values.username && values.username !== profile.username) {
      updates.username = values.username;
    }
    updates.bio = values.bio;

    try {
      const result = await updateProfile(updates).unwrap();

      setProfile((prev) => ({
        ...prev,
        username: result.updatedUser?.username ?? prev.username,
        bio: result.updatedProfile?.bio ?? prev.bio,
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
      <DialogContent className="bg-custom-3 border-none max-w-full">
        <DialogHeader>
          <DialogTitle className="text-custom-9">Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-custom-1 max-w-xl mx-auto p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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

            {error && "data" in error && isErrorData(error.data) && (
              <div className="text-md bg-red-600  text-white p-3 rounded-lg">
                <p>{error.data.error}</p>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-custom-2 text-xl font-bold p-8 w-full"
                type="submit"
              >
                {isLoading ? "Updating profile..." : "Submit ♥‿♥"}
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
