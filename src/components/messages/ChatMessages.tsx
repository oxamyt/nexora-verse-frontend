import { Message } from "@/types/types";
import { motion } from "motion/react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";

export function ChatMessage({
  msg,
  handleEditMessage,
}: {
  msg: Message;
  handleEditMessage: (message: Message) => void;
}) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isCurrentUser = Number(msg.sender.id) === Number(userId);

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
        className={`max-w-40 flex flex-col ${isCurrentUser ? "items-end" : ""}`}
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

      {isCurrentUser && (
        <MdEdit
          className="text-white w-5 h-5 absolute top-7 right-10 cursor-pointer"
          onClick={() => handleEditMessage(msg)}
        />
      )}
    </motion.div>
  );
}
