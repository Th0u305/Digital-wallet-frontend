import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authApi, useLoginMutation, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import Password from "../ui/password";
import { useAppDispatch } from "@/redux/hook";

const AdminLoginForm = ({ className,...props}: React.HTMLAttributes<HTMLDivElement>) => {

  const navigate = useNavigate();
  const { data : userData } = useUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();


  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    

    if (userData?.data?.email) {
      toast.error("You're already logged in")
      navigate("/")
      return
    }

    const UserData = {
        email : data?.email,
        password : data?.password,
        role : "ADMIN"
    }


    try {
        const res = await login(UserData).unwrap();

      if (res.success) {

        if(!res?.data?.user?.isVerified) {
          toast.error("Your're not verified")
          navigate("/verify", { state: { email : data.email , role : res?.data?.user?.role}});
          return await logout(undefined);
        }
        
        const toastId = toast.loading("Logging");        
        toast.success("Logged in successfully", { id : toastId});
        navigate("/");
        dispatch(authApi.util.resetApiState());

      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);

      if (err?.data) {
        toast.error("Something went wrong")
      }
      
      // if (err.data?.message === "No account found with this email") {
      //   toast.error("No account found")
      // }

      // if (err?.data?.message === "Password does not match" || err?.data?.message === "Incorrect password") {
      //   toast.error("Invalid credentials");
      // }

      if (err?.data?.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: { email : data.email , role : data.role}});
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          onClick={() =>
            window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`)
          }
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}

export default AdminLoginForm
