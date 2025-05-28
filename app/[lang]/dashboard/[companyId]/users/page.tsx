import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { UsersTable } from "@/components/users/users-table"
import { UsersFilters } from "@/components/users/users-filters"
import { UsersStats } from "@/components/users/users-stats"
import { CreateUserModal } from "@/components/users/create-user-modal"
import { BulkActionsBar } from "@/components/users/bulk-actions-bar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, Upload, UsersIcon, UserCheck, UserX } from "lucide-react"

export default async function UsersPage({
  params,
}: {
  params: {
    lang: string
    companyId: string
  }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{dict.users?.title || "Users"}</h1>
          <p className="text-muted-foreground">{dict.users?.subtitle || "Manage user accounts and permissions"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            {dict.users?.actions?.import || "Import Users"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {dict.users?.actions?.export || "Export"}
          </Button>
          <CreateUserModal lang={params.lang} dict={dict}>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              {dict.users?.actions?.add_user || "Add User"}
            </Button>
          </CreateUserModal>
        </div>
      </div>

      {/* Stats Overview */}
      <Suspense fallback={<div className="h-32 rounded-lg bg-muted animate-pulse" />}>
        <UsersStats lang={params.lang} dict={dict} companyId={params.companyId} />
      </Suspense>

      {/* Filters */}
      <UsersFilters lang={params.lang} dict={dict} />

      {/* Bulk Actions */}
      <BulkActionsBar lang={params.lang} dict={dict} />

      {/* Users Views */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            {dict.users?.tabs?.all || "All Users"}
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            {dict.users?.tabs?.active || "Active"}
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex items-center gap-2">
            <UserX className="h-4 w-4" />
            {dict.users?.tabs?.inactive || "Inactive"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
              <UsersTable lang={params.lang} dict={dict} filter="all" />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="rounded-md border">
            <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
              <UsersTable lang={params.lang} dict={dict} filter="active" />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="rounded-md border">
            <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
              <UsersTable lang={params.lang} dict={dict} filter="inactive" />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
