import { Message } from "@/types/types";
import { motion } from "motion/react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDeleteMessageMutation } from "@/store/Api";

export function ChatMessage({
  msg,
  handleEditMessage,
}: {
  msg: Message;
  handleEditMessage: (message: Message) => void;
}) {
  const [deleteMessage, { isLoading: isLoadingDelete }] =
    useDeleteMessageMutation();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isCurrentUser = Number(msg.sender.id) === Number(userId);

  async function onDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmed) return;
    try {
      await deleteMessage({ id: msg.id, receiverId: msg.receiver.id });
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  }

  return (
    <motion.div
      key={msg.id}
      className={`flex relative ${
        isCurrentUser ? "flex-row-reverse" : ""
      } gap-3`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src={msg.sender.avatarUrl}
        alt={msg.sender.username}
        className="w-8 h-8 mt-2 rounded-full object-cover"
      />
      <div
        className={`max-w-40 lg:max-w-lg flex flex-col ${
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
        {isCurrentUser && (
          <div className="  flex gap-2">
            <button className="bg-custom-11 p-1 rounded-full">
              <MdEdit
                className="text-white w-5 h-5"
                onClick={() => handleEditMessage(msg)}
              />
            </button>
            <button
              disabled={isLoadingDelete}
              className="bg-red-600 p-1 rounded-full"
            >
              <RiDeleteBin6Fill
                className="text-white w-5 h-5"
                onClick={() => onDelete()}
              />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
