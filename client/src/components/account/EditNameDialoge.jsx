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
import { changeName } from "@/store/features/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const EditNameDialoge = ({ name }) => {
  const [editedName, setEditedName] = useState(name);
  const dispatch = useDispatch();

  async function handleEdit() {
    dispatch(changeName(editedName));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Your Name</DialogTitle>
          <DialogDescription>
            If you want to change the name associated with your Primekart
            customer account, you may do so below. Be sure to click the Save
            Changes button when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleEdit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNameDialoge;
