import { socket } from "@/utils/socket/socket";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetMessagesQuery } from "@/store/Api";
import { motion } from "motion/react";
import { Message } from "@/types/types";
import { ChatForm } from "@/components/messages/ChatForm";

export function ChatPage() {
  const { userId: receiverId } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);

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

      <ChatForm receiverId={Number(receiverId)} />
    </div>
  );
}
