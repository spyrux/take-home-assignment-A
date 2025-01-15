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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Check, CircleHelp } from "lucide-react";
import { useState } from "react";
import axios from "./http-common";
import { useMutation } from "react-query";

interface CreateQueryModalProps {
  title: string;
  description: string;
  formDataId: string;
  refetch: () => void;
}

export function CreateQueryModal({
  title,
  formDataId,
  refetch,
}: CreateQueryModalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [queryText, setQueryText] = useState("");

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value);
  };

  const postQuery = async (
    queryText: string,
    title: string,
    formDataId: string
  ) => {
    const body = {
      title: title,
      description: queryText,
      formDataId: formDataId,
    };
    const response = await axios.post("/query", body);
    return response.data;
  };
  const { mutate } = useMutation(
    (queryText: string) => postQuery(queryText, title, formDataId),
    {
      onSuccess: () => {
        // Refetch the table data after the POST request is successful
        refetch();
      },
      onError: (error) => {
        console.error("Error submitting query:", error);
      },
    }
  );
  const handleSubmit = async () => {
    await mutate(queryText); // Trigger the mutation
    setIsDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="hover:bg-accent border grid aspect-square place-items-center rounded-lg h-8 w-8 p-0"
          >
            <Plus className="h-9 w-9" />
            <span className="sr-only">Open Dialog</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Query.</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle className="w-[90%]">
              Create a Query | {title}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="queryInput" className="text-right">
                Query Text
              </Label>
              <Input
                id="queryInput"
                value={queryText} // Bind the input value to state
                onChange={handleInputChange} // Update state on change
                className="col-span-3"
                placeholder="Add a new remark"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
