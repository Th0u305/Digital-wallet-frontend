import { DollarSign, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import {
  authApi,
  useAddOrWithDrawMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

type Inputs = {
  amount: number;
};

const AddMoneyModal = () => {
  const [addMoney] = useAddOrWithDrawMutation();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    if (data.amount < 50) {
      return toast.error("Minimum amount is 50");
    }
    const userInfo = {
      amount: Number(data.amount),
      transactionType: "ADD_MONEY",
    };

    try {
      const toastId = toast.loading("Adding money");
      await addMoney(userInfo).unwrap();
      toast.success("Added money successfully", { id: toastId });
      dispatch(authApi.util.resetApiState());

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <button  className="group:hover:scale-110 transition-transform p-0 mx-auto w-6 h-6 cursor-pointer">
            <Plus />
          </button>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add money</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount to Add
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                {...register("amount")}
                type="number"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <AlertDialogAction type="submit">Add</AlertDialogAction>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddMoneyModal;
