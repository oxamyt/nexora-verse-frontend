import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Follow } from "@/types/types";
import { Link } from "react-router-dom";
import { FollowListProps } from "@/types/types";

export function FollowList({ query, followType }: FollowListProps) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  if (!id) {
    return <div>No user ID provided</div>;
  }

  const { data: followData, isLoading } = query(id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className=" font-bold text-custom-2 "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {followType}
        </motion.button>
      </DialogTrigger>
      <DialogContent className="bg-custom-3 border-none max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-custom-9">{followType}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p className="text-custom-5">Loading...</p>
        ) : (
          <ul className="text-custom-9 space-y-2 overflow-y-auto max-h-80">
            {followData?.map((user: Follow) => (
              <li key={user.id}>
                <Link
                  to={`/profile/${user.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-custom-4 transition"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={user.avatarUrl}
                    alt={`${user.username}'s avatar`}
                  />
                  <h2 className="text-base">{user.username}</h2>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
