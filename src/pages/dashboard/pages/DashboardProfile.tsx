
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import {
  authApi,
  useChangePasswordMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import omitEmpty from "omit-empty";
import { useAppDispatch } from "@/redux/hook";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Password from "@/components/ui/password";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Info, User } from "lucide-react";
import { useNavigate } from "react-router";

interface updateSchema {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface passList {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function DashboardProfile() {
  const { data } = useUserInfoQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [updatePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate()
  

  const form = useForm({
    defaultValues: {
      name: "",
      email: data?.data?.email,
      phone: "",
      address: "",
    },
  });

  const passwordForm = useForm({
    // resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: updateSchema) => {
    if (
      values?.name?.length === 0 &&
      values?.phone?.length === 0 &&
      values?.address?.length === 0
    ) {
      return toast.error("Please choose something to update");
    }

    const myObject = {
      name: values.name,
      phone: values.phone,
      address: values.address,
    };
    const userInfo = omitEmpty(myObject);

    const toastId = toast.loading("Updating user");

    try {
      await updateUser({ userInfo: userInfo, id: data?.data?._id });
      toast.success("User info successfully", { id: toastId });
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };

  const passwordOnsubmit = async (data: passList) => {

    if (!data.oldPassword && !data.newPassword && !data.confirmPassword) {
      return toast.error("Please choose your password to update")
    }

    if (!data.oldPassword) {
      return toast.error("Please type your old password")
    }

    if (data.newPassword !== data.confirmPassword) {
      return toast.error(
        "Your new password doesn't match . Please confirm your password"
      );
    }

    const userInfo = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    const toastId = toast.loading("Updating password");

    try {
      const res = await updatePassword(userInfo);
      if (res.error) {
        return toast.error("Old password does not match", { id : toastId})
      }   
      toast.success("Updated password successfully", { id: toastId });
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
      navigate("/login")
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex h-full flex-col justify-center w-2xl mx-auto gap-6">
      <Card className="h-fit">
        <CardHeader className="w-fit mx-auto">
          <Avatar className="h-20 w-20 border-2 border-accent">
            <AvatarImage
              src={
                data?.data?.picture || data?.data?.name?.charAt(0).toUpperCase()
              }
            />
            <AvatarFallback className="text-4xl">
              {data?.data?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardHeader className="text-center">
          <CardTitle className="text-lg">User info</CardTitle>
        </CardHeader>
        <CardContent className="h-56 flex flex-col justify-between overflow-auto">
          <Separator />
          <div className="flex justify-between">
            <span className="w-fit">
              <h1>Name </h1>
            </span>
            <Separator
              className="hidden md:block ml-15"
              orientation="vertical"
            />
            <span className="w-fit">
              <p className="text-sm text-slate-300">{data?.data?.name}</p>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="w-fit">
              <h1>Email</h1>
            </span>
            <Separator
              className="hidden md:block ml-[10.1rem]"
              orientation="vertical"
            />
            <span className="w-fit">
              <p className="text-sm text-slate-300">{data?.data?.email}</p>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="w-fit">
              <h1>Phone</h1>
            </span>
            <Separator
              className="hidden md:block ml-16"
              orientation="vertical"
            />
            <span className="w-fit">
              <p className="text-sm text-slate-300">{data?.data?.phone}</p>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="w-fit">
              <h1>Address</h1>
            </span>
            <Separator
              className="hidden md:block ml-21"
              orientation="vertical"
            />
            <span className="w-fit">
              <p className="text-sm text-slate-300">
                {data?.data?.address || "No address info found"}
              </p>
            </span>
          </div>
          <Separator />
        </CardContent>
      </Card>

      <div className="w-fit mx-auto flex gap-1 sm:gap-3 md:gap-6">
        <AlertDialog
        // open={open}
        >
          <AlertDialogTrigger asChild>
            <span>
              <Button variant="secondary" className="">
                <User/>
                Update Profile
              </Button>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update user info</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription />
            <Card className="border-2 w-full">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
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
                            <Input readOnly disabled type="email" {...field} />
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
                              placeholder="+031235425"
                              type="phone"
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

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="" {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Update
                    </Button>
                  </form>
                </FormProvider>
              </CardContent>
            </Card>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
        // open={open}
        >
          <AlertDialogTrigger asChild>
            <span>
              <Button variant="secondary" className="">
                <Info/>
                Update Password
              </Button>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update password</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription />
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password for better security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={passwordForm.handleSubmit(passwordOnsubmit)}
                    className="space-y-6"
                  >
                    {/* Old password */}
                    <FormField
                      control={passwordForm.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old Password</FormLabel>
                          <FormControl>
                            <Password {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            old password
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* New Password */}
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Password {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            new password.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm password */}
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Password {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            confirm password.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Update
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
