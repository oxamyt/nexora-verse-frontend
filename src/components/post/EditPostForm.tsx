import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { postSchema } from "@/utils/validation/schemas";
import { motion } from "motion/react";
import { useUpdatePostMutation } from "@/store/Api";
import { MdOutlineEdit } from "react-icons/md";
import { useState, useRef } from "react";
import { FaFileImage } from "react-icons/fa";
import { Post } from "@/types/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function EditPostForm({ post }: { post: Post }) {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    post.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function removeImage() {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(values: z.infer<typeof postSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("body", values.body || "");
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await updatePost({ data: formData, id: post.id }).unwrap();

      setOpen(false);
      form.reset();
      removeImage();
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <MdOutlineEdit className="w-8 h-8 text-custom-5 cursor-pointer" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="bg-custom-1 border-none sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-custom-9">Edit Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 text-custom-1 max-w-full mx-auto p-8"
          >
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 text-custom-5 cursor-pointer p-2 rounded-lg"
              >
                <FaFileImage className="w-6 h-6" />
                <span>Add Image</span>
              </label>

              {previewUrl && (
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-lg max-h-48 object-fill w-full"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-2xl "
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-custom-5 font-bold text-lg">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 text-custom-5 bg-custom-3 text-lg border-custom-4 focus:border-custom-2 focus:outline-none"
                      placeholder="Enter post title"
                    />
                  </FormControl>
                  <FormMessage className="text-md bg-red-600 text-white p-3 rounded-lg" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-custom-5 font-bold text-lg">
                    Body
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="pl-6 bg-custom-3 text-custom-5 text-lg border border-custom-4 focus:border-custom-2 focus:outline-none rounded-lg w-full"
                      placeholder="What's on your mind?"
                    />
                  </FormControl>
                  <FormMessage className="text-md bg-red-600 text-white p-3 rounded-lg" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="bg-custom-2 text-xl font-bold p-8 w-full"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      Saving Changes...
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </>
                  ) : (
                    "Save Changes ♥‿♥"
                  )}
                </Button>
              </motion.div>
            </div>

            {form.formState.errors.root && (
              <p className="text-md bg-red-600 text-white p-3 rounded-lg">
                {form.formState.errors.root.message}
              </p>
            )}
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
