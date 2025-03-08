import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/utils/validation/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoSendSharp } from "react-icons/io5";
import {
  useCreateMessageMutation,
  useUpdateMessageMutation,
} from "@/store/Api";
import { Message } from "@/types/types";
import { RiArrowGoBackFill } from "react-icons/ri";

export function ChatForm({
  receiverId,
  editingMessage,
  handleCancelEdit,
}: {
  receiverId: number;
  editingMessage: Message | null;
  handleCancelEdit: () => void;
}) {
  const [createMessage, { isLoading: isLoadingMessage }] =
    useCreateMessageMutation();

  const [updateMessage, { isLoading: isLoadingUpdate }] =
    useUpdateMessageMutation();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      body: "",
    },
  });

  const cancelEdit = () => {
    form.reset();
    handleCancelEdit();
  };

  useEffect(() => {
    if (editingMessage) {
      form.setValue("body", editingMessage.body);
    }
  }, [editingMessage, form]);

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    try {
      if (editingMessage) {
        const messagePayload = {
          ...values,
          messageId: editingMessage.id,
          receiverId,
        };
        await updateMessage(messagePayload).unwrap();
        handleCancelEdit();
      } else {
        const messagePayload = { ...values, receiverId };
        await createMessage(messagePayload).unwrap();
      }
      form.setValue("body", "");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return (
    <div className="sticky bottom-0 bg-custom-8 p-4 border-t border-custom-11">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    className="resize-none bg-custom-3 border-none focus:border-custom-2 text-custom-9 placeholder:text-custom-5 rounded-2xl"
                    placeholder="Message..."
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />
          {editingMessage && (
            <Button
              type="button"
              size="icon"
              className="bg-custom-2 hover:bg-custom-7 h-10 w-10 rounded-full"
              onClick={cancelEdit}
            >
              <RiArrowGoBackFill className="text-lg text-custom-9" />
            </Button>
          )}
          <Button
            type="submit"
            size="icon"
            className="bg-custom-2 hover:bg-custom-7 h-10 w-10 rounded-full"
            disabled={isLoadingMessage || isLoadingUpdate}
          >
            <IoSendSharp className="text-lg text-custom-9" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
