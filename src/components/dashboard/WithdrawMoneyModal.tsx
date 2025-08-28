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
import { authApi,useAddOrWithDrawMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

type Inputs = {
  amount: number;
};


const WithdrawMoneyModal = () => {
      const [addMoney] = useAddOrWithDrawMutation();
      const dispatch = useAppDispatch();
  
      const { register, handleSubmit } = useForm<Inputs>();
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
  
        if (data.amount < 50) {
          return toast.error("Minimum amount is 50")
        }
        const userInfo = {
          amount: Number(data.amount),
          transactionType: "WITHDRAW",
        };
        
        try {
          const toastId = toast.loading("Withdrawing money");
          await addMoney(userInfo).unwrap();
          toast.success("Successfully withdrew", { id: toastId });
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
              <button className="group-hover:scale-110 transition-transform p-0 mx-auto w-6 h-6 cursor-pointer">
                <Plus />
              </button>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>With draw money</AlertDialogTitle>
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
                {/* {errors.amount && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.amount.message}
                    </p>
                  )} */}
              </div>
  
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  How it works:
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Visit a nearby SecureWallet agent</li>
                  <li>• Show them this deposit request</li>
                  <li>• Give cash to the agent</li>
                  <li>• Money will be added instantly</li>
                </ul>
              </div>
              <AlertDialogAction type="submit">Withdraw</AlertDialogAction>
            </form>
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

export default WithdrawMoneyModal;
