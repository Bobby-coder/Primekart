import EditEmailDialoge from "@/components/account/EditEmailDialoge";
import EditNameDialoge from "@/components/account/EditNameDialoge";
import EditPasswordDialoge from "@/components/account/EditPasswordDialog";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useSelector } from "react-redux";

const MyAccountPage = () => {
  const { name, email, status } = useSelector((state) => state.auth);

  return (
    <div className="mx-auto p-6 flex justify-center my-6">
      <Card className="sm:w-[400px]">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle>Account details</CardTitle>
            <CardDescription>
              Update your account information below
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1.5">
                  <Label>Name</Label>
                  <p>{name}</p>
                </div>

                <EditNameDialoge name={name} />
              </div>

              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1.5">
                  <Label>Email</Label>
                  <p>{email}</p>
                </div>

                <EditEmailDialoge email={email} />
              </div>

              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1.5">
                  <Label>Password</Label>
                  <p>********</p>
                </div>

                <EditPasswordDialoge />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAccountPage;
