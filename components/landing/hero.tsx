import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle } from "lucide-react"

interface HeroProps {
  dict?: {
    title?: string
    subtitle?: string
    description?: string
    primaryCta?: string
    secondaryCta?: string
    watchDemo?: string
    features?: string[]
  }
  lang?: string
}

export const Hero = ({ dict, lang = "en" }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-700/10 mb-6">
              <span>{dict?.subtitle || "🚀 Smart Parking Management"}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              <span className="block">{dict?.title || "Transform Your"}</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {lang === "cs-cz" ? "Parkovací zkušenosti" : "Parking Experience"}
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              {dict?.description ||
                "Streamline parking operations with our intelligent management system. Real-time monitoring, automated reservations, and comprehensive analytics in one powerful platform."}
            </p>

            {/* Feature highlights */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              {(dict?.features || ["Real-time monitoring", "Automated reservations", "Analytics dashboard"]).map(
                (feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ),
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={`/${lang}/dashboard`}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  {dict?.primaryCta || "Start Free Trial"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-200 group"
              >
                <Play className="mr-2 h-5 w-5" />
                {dict?.watchDemo || "Watch Demo"}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by 500+ companies worldwide</p>
              <div className="flex items-center justify-center lg:justify-start gap-8 opacity-60">
                <div className="text-2xl font-bold text-gray-400">Company A</div>
                <div className="text-2xl font-bold text-gray-400">Company B</div>
                <div className="text-2xl font-bold text-gray-400">Company C</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative lg:order-last">
            <div className="relative mx-auto w-full max-w-lg">
              {/* Main dashboard mockup */}
              <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-6 bg-blue-100 rounded-full w-20"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                      </div>
                      <div className="h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-green-300 rounded-full"></div>
                      </div>
                      <div className="h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-purple-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
