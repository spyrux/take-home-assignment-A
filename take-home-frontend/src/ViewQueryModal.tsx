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
import { Check, CircleHelp } from "lucide-react";
import { useState } from "react";
// export enum QueryStatus {
//   OPEN = "OPEN",
//   RESOLVED = "RESOLVED",
// }

interface QueryModalProps {
  title: string;
  description: string;
  status: string;
  onSubmit: () => void;
  triggerText?: string;
}

export function ViewQueryModal({
  title,
  description,
  status,
  onSubmit,
  triggerText,
}: QueryModalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
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
            {status === "OPEN" ? <CircleHelp /> : <Check className="h-9 w-9" />}
            <span className="sr-only">Open Dialog</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View Query.</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle className="w-[90%]">Query | {title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
