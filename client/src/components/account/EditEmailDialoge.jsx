import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUserDetails } from "@/store/features/auth/authSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const EditEmailDialoge = ({ email }) => {
  const [componentUI, setComponentUI] = useState("changeEmail");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const dispatch = useDispatch();

  async function handleVerify() {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/verify-email-otp`,
        { newEmail, otp },
        {
          withCredentials: true,
        }
      );
      dispatch(setUserDetails(res.data?.user));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function handleContinue() {
    setLoading(true);
    try {
      // email regex pattern
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      // validate entered email pattern
      if (!emailRegex.test(newEmail)) {
        toast.error(
          "Email must start with one or more alphanumeric characters, followed by an '@' symbol, then another alphanumeric sequence, a dot, and finally a valid top-level domain extension (e.g., '.com', '.org')"
        );
        // if wrong reset email field
        setNewEmail("");
        return;
      }
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/update-user-email`,
        { newEmail },
        {
          withCredentials: true,
        }
      );
      setLoading(false);

      // change ui to verify email if mail is sent successfuly
      if (res.status === 200) {
        setComponentUI("verifyEmail");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {loading ? (
          <p>Loading...</p>
        ) : componentUI === "changeEmail" ? (
          <>
            <DialogHeader>
              <DialogTitle>Change your email address</DialogTitle>
              <DialogDescription>
                <p>Current email address:</p>
                <p className="mb-4">{email}</p>
                <p>
                  Enter the new email address you would like to associate with
                  your Primekart account below. We will send a One Time Password
                  (OTP) to that address.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  New email address
                </Label>
                <Input
                  id="name"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="example@123.domain.com"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleContinue}>Continue</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Change your email address</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              A text with a One Time Password (OTP) has been sent to your email:{" "}
              {newEmail}
            </DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Enter OTP:
                </Label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="email"
                  className="col-span-3"
                />
                <Button onClick={handleVerify}>Verify</Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditEmailDialoge;
