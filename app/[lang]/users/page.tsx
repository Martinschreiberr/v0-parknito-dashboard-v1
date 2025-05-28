import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UsersTable } from "@/components/users/users-table"

export default async function UsersPage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(lang as "en" | "cs")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{dict.users.title}</h1>
        <p className="text-muted-foreground">{dict.users.description}</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder={dict.users.search} className="w-full bg-background pl-8 sm:max-w-xs" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">{dict.users.export}</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {dict.users.add_user}
          </Button>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersTable lang={lang} dict={dict} />
      </Suspense>
    </div>
  )
}
