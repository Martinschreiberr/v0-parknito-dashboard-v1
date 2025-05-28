import { Smartphone, BarChart3, Shield, Clock, MapPin, CreditCard, Bell, Users, Zap } from "lucide-react"

interface FeaturesProps {
  dict?: {
    title?: string
    subtitle?: string
    features?: Array<{
      title: string
      description: string
      icon?: string
    }>
  }
}

export const Features = ({ dict }: FeaturesProps) => {
  const defaultFeatures = [
    {
      title: "Real-time Monitoring",
      description: "Track parking availability and occupancy in real-time with live updates and notifications.",
      icon: "smartphone",
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to optimize your parking operations and revenue.",
      icon: "chart",
    },
    {
      title: "Secure Payments",
      description: "Integrated payment processing with multiple payment methods and secure transactions.",
      icon: "credit",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to ensure your parking system runs smoothly.",
      icon: "clock",
    },
    {
      title: "Location Management",
      description: "Manage multiple parking locations from a single dashboard with ease.",
      icon: "map",
    },
    {
      title: "Smart Notifications",
      description: "Automated alerts and notifications for reservations, payments, and system updates.",
      icon: "bell",
    },
    {
      title: "User Management",
      description: "Comprehensive user management with role-based access and permissions.",
      icon: "users",
    },
    {
      title: "Quick Setup",
      description: "Get started in minutes with our easy setup process and intuitive interface.",
      icon: "zap",
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security with encryption, compliance, and data protection.",
      icon: "shield",
    },
  ]

  const features = dict?.features || defaultFeatures

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "smartphone":
        return <Smartphone className="h-6 w-6" />
      case "chart":
        return <BarChart3 className="h-6 w-6" />
      case "shield":
        return <Shield className="h-6 w-6" />
      case "clock":
        return <Clock className="h-6 w-6" />
      case "map":
        return <MapPin className="h-6 w-6" />
      case "credit":
        return <CreditCard className="h-6 w-6" />
      case "bell":
        return <Bell className="h-6 w-6" />
      case "users":
        return <Users className="h-6 w-6" />
      case "zap":
        return <Zap className="h-6 w-6" />
      default:
        return <Zap className="h-6 w-6" />
    }
  }

  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {dict?.title || "Everything you need to manage parking"}
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            {dict?.subtitle ||
              "Our comprehensive platform provides all the tools you need to streamline parking operations, increase efficiency, and improve user experience."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-gray-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {getIcon(feature.icon || "zap")}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
