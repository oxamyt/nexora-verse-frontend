import { socket } from "@/utils/socket/socket";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetMessagesQuery } from "@/store/Api";
import { Message } from "@/types/types";
import { ChatForm } from "@/components/messages/ChatForm";
import { ChatMessage } from "@/components/messages/ChatMessage";

export function ChatPage() {
  const { userId: receiverId } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);

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

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
  };

  useEffect(() => {
    const handleReceiveMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    const handleUpdateMessage = (updatedMessage: Message) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
      );
    };

    const handleDeleteMessage = (deletedMessage: Message) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedMessage.id));
    };

    if (userId && receiverId) {
      socket.emit("joinChat", {
        userId: Number(userId),
        chatPartnerId: Number(receiverId),
      });

      socket.on("receiveMessage", handleReceiveMessage);
      socket.on("updateMessage", handleUpdateMessage);
      socket.on("deleteMessage", handleDeleteMessage);
    }

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("updateMessage", handleUpdateMessage);
      socket.on("deleteMessage", handleDeleteMessage);
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
      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full lg:px-0">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            msg={msg}
            handleEditMessage={handleEditMessage}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto w-full lg:px-0">
        <ChatForm
          receiverId={Number(receiverId)}
          editingMessage={editingMessage}
          handleCancelEdit={handleCancelEdit}
        />
      </div>
    </div>
  );
}
