"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, Smartphone, AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react"

interface SecuritySettingsProps {
  dictionary: any
}

export function SecuritySettings({ dictionary }: SecuritySettingsProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {dictionary?.profile?.changePassword || "Change Password"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.changePasswordDesc || "Update your password to keep your account secure."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{dictionary?.profile?.currentPassword || "Current Password"}</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">{dictionary?.profile?.newPassword || "New Password"}</Label>
            <div className="relative">
              <Input id="newPassword" type={showNewPassword ? "text" : "password"} placeholder="Enter new password" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{dictionary?.profile?.confirmPassword || "Confirm New Password"}</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {dictionary?.profile?.passwordRequirements ||
                "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters."}
            </AlertDescription>
          </Alert>

          <Button>{dictionary?.profile?.updatePassword || "Update Password"}</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {dictionary?.profile?.twoFactor || "Two-Factor Authentication"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.twoFactorDesc || "Add an extra layer of security to your account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{dictionary?.profile?.authenticatorApp || "Authenticator App"}</span>
                {twoFactorEnabled && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {dictionary?.profile?.enabled || "Enabled"}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {dictionary?.profile?.authenticatorDesc || "Use an authenticator app to generate verification codes."}
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{dictionary?.profile?.appConfigured || "Authenticator app is configured"}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  {dictionary?.profile?.viewBackupCodes || "View Backup Codes"}
                </Button>
                <Button variant="outline" size="sm">
                  {dictionary?.profile?.reconfigure || "Reconfigure"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {dictionary?.profile?.activeSessions || "Active Sessions"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.activeSessionsDesc || "Manage your active login sessions across devices."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {/* Current Session */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Chrome on Windows</span>
                  <Badge variant="secondary">Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">San Francisco, CA • Last active: Now</p>
              </div>
            </div>

            {/* Other Sessions */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <span className="font-medium">Safari on iPhone</span>
                <p className="text-sm text-muted-foreground">San Francisco, CA • Last active: 2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">
                {dictionary?.profile?.revoke || "Revoke"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <span className="font-medium">Chrome on Android</span>
                <p className="text-sm text-muted-foreground">Los Angeles, CA • Last active: 1 day ago</p>
              </div>
              <Button variant="outline" size="sm">
                {dictionary?.profile?.revoke || "Revoke"}
              </Button>
            </div>
          </div>

          <Button variant="destructive" className="w-full">
            {dictionary?.profile?.revokeAllSessions || "Revoke All Other Sessions"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
