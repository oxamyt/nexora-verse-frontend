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
import { ProfileFormProps } from "@/types/types";

export function ProfileForm({ profile, setProfile }: ProfileFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: profile.username || "",
      bio: profile.bio || "",
    },
  });

  function onSubmit() {
    console.log();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <motion.button
          className="bg-custom-4 rounded-full text-custom-8 text-xl font-bold px-4 py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Edit Profile
        </motion.button>
      </DialogTrigger>
      <DialogContent className="bg-custom-3 max-w-full">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
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
                  <FormLabel className="text-custom-1 font-bold text-lg">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="p-6  text-custom-7 bg-custom-6 text-lg border border-custom-2 rounded-lg w-full"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-md text-custom-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-custom-1 font-bold text-lg">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="pl-6 bg-custom-6 text-custom-7 text-lg border border-custom-2 rounded-lg w-full"
                      placeholder="Enter your bio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-md text-custom-5" />
                </FormItem>
              )}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-custom-4 text-xl font-bold p-8 w-full"
                type="submit"
              >
                Submit
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
