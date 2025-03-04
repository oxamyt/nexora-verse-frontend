import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteCommentMutation } from "@/store/Api";
import { motion } from "motion/react";

export function DeleteCommentButton({ commentId }: { commentId: number }) {
  const [deleteComment] = useDeleteCommentMutation();

  async function deletePostSubmit() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;

    try {
      await deleteComment(commentId).unwrap();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

  return (
    <motion.button
      aria-label="New Comment"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <RiDeleteBin6Line
        onClick={deletePostSubmit}
        className="mt-1 w-6 h-6 text-custom-5 cursor-pointer"
      />
    </motion.button>
  );
}
