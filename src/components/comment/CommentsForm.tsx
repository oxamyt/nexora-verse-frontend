import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "motion/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CommentSchema } from "@/utils/validation/schemas";
import { useCreateCommentMutation } from "@/store/Api";
import { useState } from "react";
import { CommentTrigger } from "./CommentTrigger";
import { isErrorData } from "@/types/ErrorDataTypes";

export function CommentsForm({ postId }: { postId: number }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const [createComment, { isLoading, error }] = useCreateCommentMutation();

  async function onSubmit(values: z.infer<typeof CommentSchema>) {
    try {
      const data = { postId, content: values.content };
      await createComment(data).unwrap();
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }

  return (
    <div className="mt-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.button
            aria-label="New Comment"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CommentTrigger />
          </motion.button>
        </DialogTrigger>
        <DialogContent className="bg-custom-1 border-none">
          <DialogHeader>
            <DialogTitle className="text-custom-9">Create Comment</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 text-custom-1 max-w-full mx-auto p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="p-6 text-custom-5 bg-custom-3 text-lg border-custom-4 focus:border-custom-2 focus:outline-none"
                        placeholder="Write your comment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-md bg-red-600 text-white p-3 rounded-lg" />
                  </FormItem>
                )}
              />
              {error && "data" in error && isErrorData(error.data) && (
                <div className="text-md bg-red-600 text-white p-3 rounded-lg">
                  <p>{error.data.error}</p>
                </div>
              )}
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
                      Creating Comment...
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </>
                  ) : (
                    "Create Comment ♥‿♥"
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
