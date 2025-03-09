import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useGetUsersQuery } from "@/store/Api";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useState } from "react";
import { User } from "@/types/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export function UsersList() {
  const { data: users, isFetching, error } = useGetUsersQuery("");
  const [usernameValue, setUsernameValue] = useState("");
  const userId = useSelector((state: RootState) => state.auth.userId);

  const filteredUsers = users
    ?.filter((user: User) =>
      user.username.toLowerCase().includes(usernameValue.toLowerCase())
    )
    .filter((user: User) => user.id !== Number(userId));

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <Input
        placeholder="Search username..."
        value={usernameValue}
        onChange={(e) => setUsernameValue(e.target.value)}
        className="bg-custom-3 border-custom-4 text-custom-5 placeholder:text-custom-5 focus:border-custom-2 p-4 text-lg rounded-lg shadow-sm"
      />

      <div className="min-h-40">
        {isFetching ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full bg-custom-3 rounded-lg" />
            <Skeleton className="h-4 w-2/3 bg-custom-3 rounded-lg" />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-600/90 text-white rounded-lg shadow-md"
          >
            Error occurred while searching.
          </motion.div>
        ) : filteredUsers?.length ? (
          <div className="space-y-4">
            {filteredUsers.map((user: User) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-custom-3 p-4 rounded-lg shadow-md"
              >
                <Link
                  to={`/messages/${user.id}`}
                  className="flex items-center gap-4 group"
                >
                  <Avatar className="w-12 h-12 rounded-full border-2 border-custom-8">
                    <AvatarImage src={user.avatarUrl} alt="Profile avatar" />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-custom-9 font-bold text-lg">
                      {user.username}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-custom-5 text-center pt-8 text-lg"
          >
            No users found
          </motion.p>
        )}
      </div>
    </div>
  );
}
