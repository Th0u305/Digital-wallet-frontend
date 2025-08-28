import { useState } from "react";
import { AgentRegisterForm } from "./AgentRegisterForm";
import { UserRegisterForm } from "./UserRegisterForm";
import { Button } from "../ui/button";

const RegisterForm = () => {
  const [userRole, setUserRole] = useState<string>("USER");

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center mb-8">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>
      <div className="mb-6">
        <h1 className="text-center mb-4">Register as user or agent</h1>
        <div className="flex justify-evenly">
          <Button onClick={() => setUserRole("USER")}>User</Button>
          <Button onClick={() => setUserRole("AGENT")}>Agent</Button>
        </div>
      </div>
      {userRole === "USER" ? <UserRegisterForm /> : <AgentRegisterForm />}
    </div>
  );
};

export default RegisterForm;
