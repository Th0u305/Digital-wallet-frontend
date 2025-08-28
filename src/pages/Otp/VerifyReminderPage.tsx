import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const VerifyReminderPage = ({email, role}: { email : string, role: string}) => {
    const navigate = useNavigate()

    const ssss = ( ) =>{
        navigate("/verify", { state: { email : email , role : role}});
    }
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black text-white dark:bg-white dark:text-black mt-2 rounded-lg"
      >
        <div className="flex gap-5 p-1">
            <p>You're not verified. Verify your account or otherwise you wont be able to perform any actions</p>
            <Button className="underline cursor-pointer" onClick={()=>ssss()}>Click here to verify</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyReminderPage;
