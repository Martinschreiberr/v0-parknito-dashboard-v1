import { getDictionary } from "@/lib/dictionary"
import { ProfileHeader } from "@/components/profile/profile-header"
import { PersonalInfoForm } from "@/components/profile/personal-info-form"
import { SecuritySettings } from "@/components/profile/security-settings"
import { NotificationSettings } from "@/components/profile/notification-settings"
import { ActivityLog } from "@/components/profile/activity-log"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfilePageProps {
  params: {
    lang: string
    companyId: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const dictionary = await getDictionary(params.lang)

  return (
    <div className="space-y-6">
      <ProfileHeader dictionary={dictionary} />

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">{dictionary?.profile?.tabs?.personal || "Personal Info"}</TabsTrigger>
          <TabsTrigger value="security">{dictionary?.profile?.tabs?.security || "Security"}</TabsTrigger>
          <TabsTrigger value="notifications">{dictionary?.profile?.tabs?.notifications || "Notifications"}</TabsTrigger>
          <TabsTrigger value="activity">{dictionary?.profile?.tabs?.activity || "Activity"}</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalInfoForm dictionary={dictionary} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings dictionary={dictionary} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings dictionary={dictionary} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityLog dictionary={dictionary} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
