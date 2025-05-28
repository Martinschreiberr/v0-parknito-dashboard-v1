import { Users, Building, Car, TrendingUp } from "lucide-react"

interface StatsProps {
  dict?: {
    title?: string
    subtitle?: string
    stats?: Array<{
      label: string
      value: string
      icon?: string
    }>
  }
}

export const Stats = ({ dict }: StatsProps) => {
  const defaultStats = [
    { label: "Active Users", value: "10,000+", icon: "users" },
    { label: "Parking Locations", value: "500+", icon: "building" },
    { label: "Vehicles Managed", value: "50,000+", icon: "car" },
    { label: "Efficiency Increase", value: "85%", icon: "trending" },
  ]

  const stats = dict?.stats || defaultStats

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users className="h-8 w-8" />
      case "building":
        return <Building className="h-8 w-8" />
      case "car":
        return <Car className="h-8 w-8" />
      case "trending":
        return <TrendingUp className="h-8 w-8" />
      default:
        return <TrendingUp className="h-8 w-8" />
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dict?.title || "Trusted by thousands worldwide"}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {dict?.subtitle || "Join the growing community of smart parking management"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                {getIcon(stat.icon || "trending")}
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
