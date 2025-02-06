import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/utils/validation/schemas";
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

export function SignUp() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
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
                <FormControl>
                  <Input
                    className="p-6 text-custom-7 bg-custom-6 text-lg border border-custom-2 rounded-lg w-full"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
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
                <FormControl>
                  <Input
                    className="p-6 bg-custom-6 text-custom-7 text-lg border border-custom-2 rounded-lg w-full"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md text-custom-5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-custom-1 font-bold text-lg">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-6 bg-custom-6 text-custom-7 text-lg border border-custom-2 rounded-lg w-full"
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md text-custom-5" />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="bg-custom-4 text-lg font-bold p-8 w-full"
              type="submit"
            >
              Sign Up ♥‿♥
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    </AuthLayout>
  );
}
