import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/utils/validation/schemas";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "./AuthLayout";
import { FaUser, FaLock } from "react-icons/fa";

export function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    return values;
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-custom-1 max-w-xl mx-auto p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-custom-1 font-bold text-lg">
                  Username
                </FormLabel>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-custom-7" />
                  <FormControl>
                    <Input
                      className="p-6 pl-12 text-custom-7 bg-custom-6 text-lg border border-custom-2 rounded-lg w-full"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-md text-custom-5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-custom-1 font-bold text-lg">
                  Password
                </FormLabel>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-custom-7" />
                  <FormControl>
                    <Input
                      className="p-6 pl-12 bg-custom-6 text-custom-7 text-lg border border-custom-2 rounded-lg w-full"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-md text-custom-5" />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="bg-custom-4 text-lg font-bold p-8 w-full"
              type="submit"
            >
              Login ♥‿♥
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    </AuthLayout>
  );
}
