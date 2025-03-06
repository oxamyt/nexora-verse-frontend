import { socket } from "@/utils/socket/socket";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetMessagesQuery, useCreateMessageMutation } from "@/store/Api";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/utils/validation/schemas";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { IoSendSharp } from "react-icons/io5";
import { Message } from "@/types/types";

export function ChatPage() {
  const { userId: receiverId } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [createMessage, { isLoading: isLoadingMessage }] =
    useCreateMessageMutation();
  const {
    data: existingMessages,
    isLoading,
    isError,
  } = useGetMessagesQuery(
    { receiverId: receiverId! },
    {
      skip: !receiverId,
      refetchOnMountOrArgChange: true,
    }
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  useEffect(() => {
    const handleReceiveMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };
    if (userId && receiverId) {
      socket.emit("joinChat", {
        userId: Number(userId),
        chatPartnerId: Number(receiverId),
      });

      socket.on("receiveMessage", handleReceiveMessage);
    }

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.emit("leaveChat", {
        userId: Number(userId),
        chatPartnerId: Number(receiverId),
      });
    };
  }, [userId, receiverId]);

  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages);
    }
  }, [existingMessages]);

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    try {
      const messagePayload = { ...values, receiverId };
      await createMessage(messagePayload).unwrap();
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  if (isLoading) return <div>Loading messages...</div>;
  if (isError) return <div>Error loading messages</div>;

  return (
    <div className="flex flex-col h-screen bg-custom-1">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isCurrentUser = Number(msg.sender.id) === Number(userId);
          return (
            <motion.div
              key={msg.id}
              className={`flex ${
                isCurrentUser ? "flex-row-reverse" : ""
              } gap-3`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={msg.sender.avatarUrl}
                alt={msg.sender.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div
                className={`max-w-40 flex flex-col ${
                  isCurrentUser ? "items-end" : ""
                }`}
              >
                <div
                  className={`p-3 rounded-2xl  ${
                    isCurrentUser
                      ? "bg-custom-2 rounded-br-none"
                      : "bg-custom-3 rounded-bl-none"
                  }`}
                  style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                >
                  <p className="text-custom-9 text-sm">{msg.body}</p>
                </div>
                <span className="text-custom-5 text-xs mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

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
    </div>
  );
}
