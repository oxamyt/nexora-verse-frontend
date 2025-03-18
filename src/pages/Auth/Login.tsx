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
import { FaUser, FaLock } from "react-icons/fa";
import { useLoginMutation } from "@/store/Api";
import { isErrorData } from "@/types/ErrorDataTypes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { setUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [focusState, setFocusState] = useState({
    username: false,
    password: false,
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [login, { isLoading, error }] = useLoginMutation();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await login(values).unwrap();

      if (response.token) {
        localStorage.setItem("token", response.token);

        dispatch(setUser(response.userId));
        navigate(`/profile/${response.userId}`);
      } else {
        console.error("Error: No token received");
      }
    } catch (err) {
      console.error("Error logging in:", err);
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
              <FormLabel className="text-custom-5 font-bold text-lg">
                Username
              </FormLabel>
              <div className="relative">
                <FaUser
                  className={`absolute w-5  h-5 left-4 top-1/2 transform -translate-y-1/2 ${
                    focusState.username ? "text-custom-2" : "text-custom-5"
                  }`}
                />
                <FormControl>
                  <Input
                    className="p-6 pl-12 text-custom-5 bg-custom-3 text-lg border-custom-3 border-2 hover:border-custom-5 focus:border-custom-2 focus:outline-none"
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
              <FormMessage className="text-md bg-red-600  text-white p-3 rounded-lg" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-5 font-bold text-lg">
                Password
              </FormLabel>
              <div className="relative">
                <FaLock
                  className={`absolute w-5  h-5 left-4 top-1/2 transform -translate-y-1/2 ${
                    focusState.password ? "text-custom-2" : "text-custom-5"
                  }`}
                />
                <FormControl>
                  <Input
                    className="p-6 pl-12 text-custom-5 bg-custom-3 text-lg border-custom-3 border-2 hover:border-custom-5 focus:border-custom-2 focus:outline-none"
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
              <FormMessage className="text-md bg-red-600  text-white p-3 rounded-lg" />
            </FormItem>
          )}
        />

        {error && "data" in error && isErrorData(error.data) && (
          <div className="text-md bg-red-600 text-white p-3 rounded-lg">
            <p>{error.data.error}</p>
          </div>
        )}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="bg-custom-2 text-xl font-bold p-8 w-full"
            type="submit"
          >
            {isLoading ? (
              <>
                Logging In...
                <AiOutlineLoading3Quarters className="animate-spin" />
              </>
            ) : (
              "Login ♥‿♥"
            )}
          </Button>
        </motion.div>

        <p className="text-custom-5 font-bold text-center mt-4">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-custom-2 font-bold">
            Sign up!
          </Link>
        </p>
      </motion.form>
    </Form>
  );
}
