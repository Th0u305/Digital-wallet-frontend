import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";


const UserAddMoneyModal = () => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <button  className="group-hover:scale-110 transition-transform p-0 mx-auto w-6 h-6 cursor-pointer">
            <Plus />
          </button>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add money</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>

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
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserAddMoneyModal;
