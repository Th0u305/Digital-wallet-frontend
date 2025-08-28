import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Shield, Ban, AlertTriangle } from "lucide-react";
import { authApi, useWalletStatusChangeMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

interface UserActionModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}


export function UserActionModal({
  user,
  open,
  onOpenChange,
}: UserActionModalProps) {
  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusChange] = useWalletStatusChangeMutation(undefined);
  const id = user?._id
  const dispatch = useAppDispatch()

  const getActionConfig = (actionType: string) => {
    switch (actionType) {
      case "SUSPENDED":
        return {
          title: "Suspend User",
          description: "Temporarily suspend this user's account",
          icon: AlertTriangle,
          buttonText: "Suspend User",
          variant: "destructive" as const,
        };
      case "BLOCKED":
        return {
          title: "Block User",
          description: "Permanently block this user's account",
          icon: Ban,
          buttonText: "Block User",
          variant: "destructive" as const,
        };
      case "ACTIVE":
        return {
          title: "Activate User",
          description: "Reactivate this user's account",
          icon: Shield,
          buttonText: "Activate User",
          variant: "default" as const,
        };
      default:
        return {
          title: "User Action",
          description: "Perform an action on this user",
          icon: Shield,
          buttonText: "Confirm",
          variant: "default" as const,
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    if (!user || !action) return

    setIsLoading(true)


    try {

      const res = await statusChange({action, id})
      if (res?.data?.success) {
        const toastId = toast.loading(`${action} user`);
        toast.success(`Successfully ${action.toLowerCase()} user`, { id : toastId});
        dispatch(authApi.util.resetApiState())
        setAction("")
        setReason("")
        onOpenChange(false)
      }else{
        toast.error("Something went wrong")
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Please try again later")
    } finally {
      setIsLoading(false)
    }
  }

  const config = getActionConfig(action);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <config.icon className="h-5 w-5" />
            <span>{config.title}</span>
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        {user && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">User:</span>
                <span className="text-sm">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Status:</span>
                <span className="text-sm capitalize">
                  {user.walletStatus.toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">          
          <Label htmlFor="action">Block or active wallet</Label>
          <Select
            value={action}
            onValueChange={setAction}
            required
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
            <SelectContent>
              {/* {user?.walletStatus.toLowerCase() === "pending" && (
                <SelectItem value="approve">Approve</SelectItem>
              )} */}
              {user?.walletStatus.toLowerCase() === "active" && (
                <SelectItem value="SUSPENDED">Suspend</SelectItem>
              )}
              {user?.walletStatus.toLowerCase() === "active" && (
                <SelectItem value="BLOCKED">Block</SelectItem>
              )}
              {(user?.walletStatus.toLowerCase() === "suspended" ||
                user?.walletStatus.toLowerCase() === "blocked") && (
                <SelectItem value="ACTIVE">Activate User</SelectItem>
              )}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Provide a reason for this action..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={config.variant}
              disabled={isLoading || !action}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                config.buttonText
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
