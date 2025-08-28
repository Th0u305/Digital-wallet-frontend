import { CreditCardIcon } from "lucide-react";
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
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  authApi,
  useSendMoneyMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";

interface MONEY {
  money : string,
  email : string,
}

const CashOutMoneyModal = () => {
  const [sendMoney] = useSendMoneyMutation();
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      money: "",
    },
  });
  const onSubmit = async (data: MONEY) => {
    const id = data.email;
    const userInfo = {
      amount: Number(data.money),
      transactionType: "CASH_OUT",
    };

    try {
      const res = await sendMoney({ userInfo, id });
      console.log(res);

      const toastId = toast.loading("Cash out money");
      if (res.error) {
        if (res?.error?.data?.message === "Receiver account doesn't exists") {
          return toast.error("Wrong email address", { id: toastId });
        }
        if (
          res?.error?.data?.message === "Insufficient funds for this operation."
        ) {
          return toast.error("Insufficient funds", { id: toastId });
        }
      }
      toast.success("successfully cashed out money", { id: toastId });
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
            <CreditCardIcon />
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
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Cash Out
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

export default CashOutMoneyModal;
