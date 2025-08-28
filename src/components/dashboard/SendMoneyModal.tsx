import { Send } from "lucide-react";
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
import { authApi, useSendMoneyMutation } from "@/redux/features/auth/auth.api";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

interface MONEY {
  money: string;
  email: string;
}

const SendMoneyModal = () => {
  const [sendMoney] = useSendMoneyMutation();
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      money: "",
    },
  });
  const onSubmit = async (data:MONEY) => {
    const id = data.email;
    const userInfo = {
      amount: Number(data.money),
      transactionType: "SEND_MONEY",
    };

    try {
      const res = await sendMoney({ userInfo, id });

      const toastId = toast.loading("Sending money");
      if (res.error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ddd: any = res.error;
        return toast.error(ddd?.data.message, { id: toastId });
      }
      toast.success("successfully sent money", { id: toastId });
      dispatch(authApi.util.resetApiState());

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <button className="group-hover:scale-110 transition-transform p-0 mx-auto w-6 h-6 mt-3 cursor-pointer">
            <Send />
          </button>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* name */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Recipient email Number</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
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
              name="money"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={50}
                      placeholder="0.00"
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

            <Button type="submit" className="w-full">
              Sent
            </Button>
          </form>
        </FormProvider>
        <AlertDialogFooter>
          <AlertDialogCancel
          // onClick={()=>setisopen(!open)}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SendMoneyModal;
