import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/utils/validation/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoSendSharp } from "react-icons/io5";
import { useCreateMessageMutation } from "@/store/Api";

export function ChatForm({ receiverId }: { receiverId: number }) {
  const [createMessage, { isLoading: isLoadingMessage }] =
    useCreateMessageMutation();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    try {
      const messagePayload = { ...values, receiverId };
      await createMessage(messagePayload).unwrap();
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
          className="flex gap-2 items-end"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    className="resize-none bg-custom-3 border-none text-custom-9 placeholder:text-custom-5 pr-12 rounded-2xl"
                    placeholder="Message..."
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-custom-6 hover:bg-custom-7 h-10 w-10 rounded-full shrink-0"
            disabled={isLoadingMessage}
          >
            <IoSendSharp className="text-lg text-custom-9" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
