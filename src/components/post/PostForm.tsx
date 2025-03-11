import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { postSchema } from "@/utils/validation/schemas";
import { IoCreateOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { useCreatePostMutation } from "@/store/Api";
import { FaFileImage } from "react-icons/fa";

export function PostForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { body: "", title: "" },
  });

  const [createPost, { isLoading }] = useCreatePostMutation();

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

  async function onSubmit(values: { title: string; body: string }) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await createPost(formData).unwrap();

      setOpen(false);
      form.reset();
      removeImage();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }

  return (
    <div className="fixed bottom-20 right-5 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.button
            aria-label="New Post"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoCreateOutline className="bg-custom-2 text-white p-2 w-16 h-16 rounded-full shadow-lg cursor-pointer" />
          </motion.button>
        </DialogTrigger>
        <DialogContent className="bg-custom-1 border-none">
          <DialogHeader>
            <DialogTitle className="text-custom-9">Create Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 text-custom-1 max-w-full mx-auto p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
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
                      className="rounded-lg max-h-48 object-cover w-full"
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
                        className="p-6 text-custom-5 bg-custom-3 text-lg border-custom-4 focus:border-custom-2 focus:outline-none"
                        placeholder="Enter post title"
                        {...field}
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
                        className="pl-6 bg-custom-3 text-custom-5 text-lg border border-custom-4 focus:border-custom-2 focus:outline-none rounded-lg w-full"
                        placeholder="What's on your mind?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-md bg-red-600 text-white p-3 rounded-lg" />
                  </FormItem>
                )}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="bg-custom-2 text-xl font-bold p-8 w-full"
                  type="submit"
                >
                  {isLoading ? "Creating Post..." : "Create Post ♥‿♥"}
                </Button>
              </motion.div>
            </motion.form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
