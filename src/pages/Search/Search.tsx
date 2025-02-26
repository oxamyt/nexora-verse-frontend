import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { searchUsernameSchema } from "@/utils/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useLazyGetByUsernameQuery } from "@/store/Api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Search() {
  const [getUserByUsername, { data, isFetching, error }] =
    useLazyGetByUsernameQuery();

  const form = useForm<z.infer<typeof searchUsernameSchema>>({
    resolver: zodResolver(searchUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: { username: string }) => {
    getUserByUsername(values.username);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 items-start"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Input
                      placeholder="Search username..."
                      {...field}
                      className="bg-custom-3 border-custom-4 text-custom-5 placeholder:text-custom-5 focus:border-custom-2 p-4 text-lg rounded-lg shadow-sm"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-md bg-red-600 text-white p-3 rounded-lg mt-2" />
              </FormItem>
            )}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-[2px]"
          >
            <Button
              type="submit"
              className="bg-custom-8 hover:bg-custom-7 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-sm "
            >
              Search
            </Button>
          </motion.div>
        </form>
      </Form>

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
        ) : data ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-custom-3 p-4 rounded-lg shadow-md "
          >
            <Link
              to={`/profile/${data.id}`}
              className="flex items-center gap-4 group"
            >
              <Avatar className="w-12 h-12 rounded-full border-2 border-custom-8">
                <AvatarImage src={data.avatarUrl} alt="Profile avatar" />
                <AvatarFallback>{data.username}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-custom-9 font-bold text-lg  ">
                  {data.username}
                </h3>
              </div>
            </Link>
          </motion.div>
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
