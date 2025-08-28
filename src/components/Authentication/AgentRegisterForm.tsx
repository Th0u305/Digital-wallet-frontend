import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Password from "../ui/password";
import { useAgentRegisterMutation } from "@/redux/features/auth/auth.api";

const registerSchema = z.object({
    name: z
      .string({ error: "Name must be string" })
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(50, { message: "Name cannot exceed 50 characters." }),
    email: z
      .string({ error: "Email must be string" })
      .email({ message: "Invalid email address format." })
      .min(5, { message: "Email must be at least 5 characters long." })
      .max(100, { message: "Email cannot exceed 100 characters." }),
    password: z
      .string({ error: "Password must be string" })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    confirmPassword: z
      .string({ error: "Password must be string" })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    phone: z
      .string({ error: "Phone Number must be string" })
      .min(12,"Phone number is less than 12 character")
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      }),
    address: z
      .string({ error: "Address must be string" })
      .max(200, { message: "Address cannot exceed 200 characters." }),
    nidNumber: z
      .string().min(10, "A valid NID number is required"),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function AgentRegisterForm({className,...props}: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useAgentRegisterMutation();
  const navigate = useNavigate();


  const form = useForm<z.infer<typeof registerSchema>>({

    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      nidNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {

    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      nidNumber: data.nidNumber,
    };

    try {
      const toastId = toast.loading("Creating User");
      await register(userInfo).unwrap();
      toast.success("User created successfully", { id : toastId});
      navigate("/verify", { state: { email : data.email , role : "AGENT"}});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="text"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="john.doe@company.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="+031235425"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Australia"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* nidNumber */}
            <FormField
              control={form.control}
              name="nidNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nid Number</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="ASDH7234HF734"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
