import { Button } from "@/components/ui/button";
import UsePostEndpoint from "@/services/helpers/PostEndpoints";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Logout({ dialogState }: { dialogState: boolean }) {
  const navigate = useNavigate();
  const [isLoggingOut, setLoggingOut] = useState(false);
  const { status, error } = UsePostEndpoint("logout/", isLoggingOut, true);
  const [openState, setOpenState] = useState<boolean>(dialogState);

  useEffect(() => {
    if (isLoggingOut) {
      console.log(status);
      if (status === 201) {
        navigate("/login");
        localStorage.removeItem("authToken");
        return;
      } else if (status === 401) {
        console.log("Logout unsuccessfull");
      }
    }
  }, [error, isLoggingOut, status]);

  return (
    <>
      <Dialog open={openState}>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Logout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="grow"
                  onClick={() => {
                    setOpenState(!dialogState);
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="grow bg-red-600 hover:bg-red-700"
                onClick={() => setLoggingOut(true)}
                disabled={isLoggingOut}
              >
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default Logout;
