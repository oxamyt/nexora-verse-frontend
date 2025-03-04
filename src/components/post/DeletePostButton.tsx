import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeletePostMutation } from "@/store/Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function DeletePostButton({ postId }: { postId: number }) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  async function deletePostSubmit() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    try {
      await deletePost(postId).unwrap();
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  }

  return (
    <RiDeleteBin6Line
      onClick={deletePostSubmit}
      className="w-8 h-8 text-custom-5 cursor-pointer"
    />
  );
}
