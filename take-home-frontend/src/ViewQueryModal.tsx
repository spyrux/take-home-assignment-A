import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Check, CircleHelp } from 'lucide-react'
import { useState } from 'react'
import axios from './http-common'
import { useMutation } from 'react-query'

interface ViewQueryModalProps {
  title: string
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
  queryId: string
  refetch: () => void
}

const putQuery = async (queryId: string) => {
  const body = {
    status: 'RESOLVED',
  }
  const response = await axios.put(`/query/${queryId}`, body)
  return response.data
}

const deleteQuery = async (queryId: string) => {
  const response = await axios.delete(`/query/${queryId}`)
  return response.data
}

export function ViewQueryModal({
  title,
  description,
  createdAt,
  updatedAt,
  status,
  queryId,
  refetch,
}: ViewQueryModalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
  }

  const { mutate: mutateUpdate } = useMutation(() => putQuery(queryId), {
    onSuccess: () => {
      // Refetch the table data after the PUT request is successful
      refetch()
    },
    onError: error => {
      console.error('Error submitting query:', error)
    },
  })

  const handleResolve = async () => {
    await mutateUpdate()
    setIsDialogOpen(false)
  }

  const { mutate: mutateDelete } = useMutation(() => deleteQuery(queryId), {
    onSuccess: () => {
      // Refetch the table data after the DELETE request is successful
      refetch()
    },
    onError: error => {
      console.error('Error submitting query:', error)
    },
  })

  const handleDelete = async () => {
    await mutateDelete()
    setIsDialogOpen(false)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="hover:bg-accent border grid aspect-square place-items-center rounded-lg h-8 w-8 p-0"
          >
            {status === 'OPEN' ? <CircleHelp /> : <Check className="h-9 w-9" />}
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
                Status
              </Label>
              <p className="flex w-36">
                {status}
                {status === 'OPEN' ? (
                  <CircleHelp className="h-6 w-6 ml-2" color="red" />
                ) : (
                  <Check className="h-6 w-6 ml-2" color="green" />
                )}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <p>{description}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Created At
              </Label>
              <p>{createdAt.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Updated At
              </Label>
              <p>{updatedAt.toLocaleString()}</p>
            </div>
          </div>
          <DialogFooter>
            {status === 'OPEN' && (
              <Button type="submit" onClick={handleResolve}>
                Resolve
              </Button>
            )}
            <Button type="submit" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
