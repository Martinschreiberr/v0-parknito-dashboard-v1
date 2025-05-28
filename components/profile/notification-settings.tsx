"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Smartphone, Calendar, AlertCircle } from "lucide-react"

interface NotificationSettingsProps {
  dictionary: any
}

export function NotificationSettings({ dictionary }: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {dictionary?.profile?.emailNotifications || "Email Notifications"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.emailNotificationsDesc || "Choose what email notifications you'd like to receive."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary?.profile?.reservationUpdates || "Reservation Updates"}</Label>
                <p className="text-sm text-muted-foreground">
                  {dictionary?.profile?.reservationUpdatesDesc ||
                    "Get notified about reservation confirmations, cancellations, and changes"}
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary?.profile?.systemAlerts || "System Alerts"}</Label>
                <p className="text-sm text-muted-foreground">
                  {dictionary?.profile?.systemAlertsDesc || "Important system updates and maintenance notifications"}
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary?.profile?.weeklyReports || "Weekly Reports"}</Label>
                <p className="text-sm text-muted-foreground">
                  {dictionary?.profile?.weeklyReportsDesc || "Weekly summary of your parking activity and statistics"}
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary?.profile?.promotions || "Promotions & Updates"}</Label>
                <p className="text-sm text-muted-foreground">
                  {dictionary?.profile?.promotionsDesc || "New features, tips, and promotional offers"}
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="space-y-2">
              <Label>{dictionary?.profile?.emailFrequency || "Email Frequency"}</Label>
              <Select defaultValue="immediate">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">{dictionary?.profile?.immediate || "Immediate"}</SelectItem>
                  <SelectItem value="daily">{dictionary?.profile?.dailyDigest || "Daily Digest"}</SelectItem>
                  <SelectItem value="weekly">{dictionary?.profile?.weeklyDigest || "Weekly Digest"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {dictionary?.profile?.pushNotifications || "Push Notifications"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.pushNotificationsDesc || "Manage push notifications for the mobile app."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{dictionary?.profile?.reservationReminders || "Reservation Reminders"}</Label>
              <p className="text-sm text-muted-foreground">
                {dictionary?.profile?.reservationRemindersDesc || "Remind me before my reservation starts"}
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{dictionary?.profile?.spotAvailable || "Spot Available"}</Label>
              <p className="text-sm text-muted-foreground">
                {dictionary?.profile?.spotAvailableDesc || "Notify when preferred spots become available"}
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{dictionary?.profile?.urgentAlerts || "Urgent Alerts"}</Label>
              <p className="text-sm text-muted-foreground">
                {dictionary?.profile?.urgentAlertsDesc || "Critical alerts about your reservations or account"}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Calendar Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {dictionary?.profile?.calendarIntegration || "Calendar Integration"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.calendarIntegrationDesc || "Sync your reservations with your calendar."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{dictionary?.profile?.syncCalendar || "Sync with Calendar"}</Label>
              <p className="text-sm text-muted-foreground">
                {dictionary?.profile?.syncCalendarDesc || "Add reservation events to your default calendar"}
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label>{dictionary?.profile?.calendarProvider || "Calendar Provider"}</Label>
            <Select defaultValue="google">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google Calendar</SelectItem>
                <SelectItem value="outlook">Outlook Calendar</SelectItem>
                <SelectItem value="apple">Apple Calendar</SelectItem>
                <SelectItem value="other">Other (CalDAV)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Do Not Disturb */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {dictionary?.profile?.doNotDisturb || "Do Not Disturb"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.doNotDisturbDesc || "Set quiet hours when you don't want to receive notifications."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{dictionary?.profile?.enableQuietHours || "Enable Quiet Hours"}</Label>
              <p className="text-sm text-muted-foreground">
                {dictionary?.profile?.enableQuietHoursDesc || "Pause non-urgent notifications during specified hours"}
              </p>
            </div>
            <Switch />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{dictionary?.profile?.startTime || "Start Time"}</Label>
              <Select defaultValue="22:00">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20:00">8:00 PM</SelectItem>
                  <SelectItem value="21:00">9:00 PM</SelectItem>
                  <SelectItem value="22:00">10:00 PM</SelectItem>
                  <SelectItem value="23:00">11:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{dictionary?.profile?.endTime || "End Time"}</Label>
              <Select defaultValue="07:00">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="06:00">6:00 AM</SelectItem>
                  <SelectItem value="07:00">7:00 AM</SelectItem>
                  <SelectItem value="08:00">8:00 AM</SelectItem>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
