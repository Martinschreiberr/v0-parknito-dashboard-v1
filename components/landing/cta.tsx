import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

interface CTAProps {
  dict?: {
    title?: string
    subtitle?: string
    primaryCta?: string
    secondaryCta?: string
    features?: string[]
  }
  lang?: string
}

export const CTA = ({ dict, lang = "en" }: CTAProps) => {
  const defaultFeatures = ["14-day free trial", "No credit card required", "Setup in minutes", "24/7 support"]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {dict?.title || "Ready to transform your parking operations?"}
        </h2>

        <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
          {dict?.subtitle ||
            "Join thousands of parking professionals who trust ParkSmart to streamline their operations and increase revenue."}
        </p>

        <div className="mt-8 flex flex-wrap gap-6 justify-center">
          {(dict?.features || defaultFeatures).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-blue-100">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${lang}/dashboard`}>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              {dict?.primaryCta || "Start Free Trial"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href={`/${lang}#contact`}>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              {dict?.secondaryCta || "Contact Sales"}
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-blue-200">No setup fees • Cancel anytime • GDPR compliant</div>
      </div>
    </section>
  )
}
