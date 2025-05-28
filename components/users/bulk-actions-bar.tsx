"use client"

import { useState } from "react"
import { Trash2, UserCheck, UserX, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Dictionary } from "@/lib/dictionary"

interface BulkActionsBarProps {
  lang: string
  dict: Dictionary
}

export function BulkActionsBar({ lang, dict }: BulkActionsBarProps) {
  const [selectedCount, setSelectedCount] = useState(0)

  if (selectedCount === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{selectedCount} selected</Badge>
        <span className="text-sm text-muted-foreground">
          {selectedCount} user{selectedCount !== 1 ? "s" : ""} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <UserCheck className="mr-2 h-4 w-4" />
          Activate
        </Button>
        <Button variant="outline" size="sm">
          <UserX className="mr-2 h-4 w-4" />
          Deactivate
        </Button>
        <Button variant="outline" size="sm">
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete {selectedCount} user
                {selectedCount !== 1 ? "s" : ""} and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Users</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
