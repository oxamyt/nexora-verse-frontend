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
import { FaUser, FaLock } from "react-icons/fa";
import { useSignUpMutation } from "@/store/Api";
import { isErrorData } from "@/types/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
    },
  });

  const navigate = useNavigate();
  const [focusState, setFocusState] = useState({
    username: false,
    password: false,
    confirm: false,
  });

  const [signUp, { isLoading, error }] = useSignUpMutation();

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await signUp(values).unwrap();
      navigate("/auth/login");
    } catch (err) {
      console.error("Error signing up:", err);
    }
  }

  return (
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
                <FaUser
                  className={`absolute w-5  h-5 left-4 top-1/2 transform -translate-y-1/2 ${
                    focusState.username ? "text-custom-1" : "text-custom-7"
                  }`}
                />
                <FormControl>
                  <Input
                    className="p-6 pl-12 text-custom-7 bg-custom-6 text-lg border border-custom-2 rounded-lg w-full"
                    placeholder="Enter your username"
                    {...field}
                    onFocus={() =>
                      setFocusState((prev) => ({ ...prev, username: true }))
                    }
                    onBlur={() =>
                      setFocusState((prev) => ({ ...prev, username: false }))
                    }
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
                <FaLock
                  className={`absolute w-5  h-5 left-4 top-1/2 transform -translate-y-1/2 ${
                    focusState.password ? "text-custom-1" : "text-custom-7"
                  }`}
                />
                <FormControl>
                  <Input
                    className="p-6 pl-12 bg-custom-6 text-custom-7 text-lg border border-custom-2 rounded-lg w-full"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    onFocus={() =>
                      setFocusState((prev) => ({ ...prev, password: true }))
                    }
                    onBlur={() =>
                      setFocusState((prev) => ({ ...prev, password: false }))
                    }
                  />
                </FormControl>
              </div>
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
              <div className="relative">
                <FaLock
                  className={`absolute w-5  h-5 left-4 top-1/2 transform -translate-y-1/2 ${
                    focusState.confirm ? "text-custom-1" : "text-custom-7"
                  }`}
                />
                <FormControl>
                  <Input
                    className="p-6 pl-12 bg-custom-6 text-custom-7 text-lg border border-custom-2 rounded-lg w-full"
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                    onFocus={() =>
                      setFocusState((prev) => ({ ...prev, confirm: true }))
                    }
                    onBlur={() =>
                      setFocusState((prev) => ({ ...prev, confirm: false }))
                    }
                  />
                </FormControl>
              </div>
              <FormMessage className="text-md text-custom-5" />
            </FormItem>
          )}
        />

        {error && "status" in error && isErrorData(error.data) && (
          <div className="text-custom-5 mt-4">
            <p>{error.data.error}</p>
          </div>
        )}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="bg-custom-4 text-lg font-bold p-8 w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up ♥‿♥"}
          </Button>
        </motion.div>
        <p className="text-custom-1 text-center mt-4">
          Have an account?{" "}
          <Link to="/auth/login" className="text-custom-4 font-bold">
            Login!
          </Link>
        </p>
      </motion.form>
    </Form>
  );
}
