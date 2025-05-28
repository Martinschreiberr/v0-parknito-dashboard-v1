import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

interface PricingProps {
  dict?: {
    title?: string
    subtitle?: string
    plans?: Array<{
      name: string
      price: string
      description: string
      features: string[]
      popular?: boolean
      cta: string
    }>
  }
  lang?: string
}

export const Pricing = ({ dict, lang = "en" }: PricingProps) => {
  const defaultPlans = [
    {
      name: lang === "cs-cz" ? "Starter" : "Starter",
      price: lang === "cs-cz" ? "690 Kč" : "$29",
      description: lang === "cs-cz" ? "Perfektní pro malé parkovací operace" : "Perfect for small parking operations",
      features:
        lang === "cs-cz"
          ? [
              "Až 50 parkovacích míst",
              "Základní analytika",
              "Emailová podpora",
              "Přístup k mobilní aplikaci",
              "Zpracování plateb",
            ]
          : ["Up to 50 parking spots", "Basic analytics", "Email support", "Mobile app access", "Payment processing"],
      cta: lang === "cs-cz" ? "Začít zdarma" : "Start Free Trial",
    },
    {
      name: lang === "cs-cz" ? "Professional" : "Professional",
      price: lang === "cs-cz" ? "2 390 Kč" : "$99",
      description: lang === "cs-cz" ? "Ideální pro rostoucí firmy" : "Ideal for growing businesses",
      features:
        lang === "cs-cz"
          ? [
              "Až 500 parkovacích míst",
              "Pokročilá analytika",
              "Prioritní podpora",
              "Více lokalit",
              "Vlastní integrace",
              "API přístup",
              "Pokročilé reporty",
            ]
          : [
              "Up to 500 parking spots",
              "Advanced analytics",
              "Priority support",
              "Multiple locations",
              "Custom integrations",
              "API access",
              "Advanced reporting",
            ],
      popular: true,
      cta: lang === "cs-cz" ? "Začít zdarma" : "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: lang === "cs-cz" ? "Individuální" : "Custom",
      description: lang === "cs-cz" ? "Pro rozsáhlé operace" : "For large-scale operations",
      features:
        lang === "cs-cz"
          ? [
              "Neomezený počet parkovacích míst",
              "Vlastní analytika",
              "24/7 dedikovaná podpora",
              "White-label řešení",
              "Vlastní integrace",
              "SLA záruka",
              "On-premise nasazení",
            ]
          : [
              "Unlimited parking spots",
              "Custom analytics",
              "24/7 dedicated support",
              "White-label solution",
              "Custom integrations",
              "SLA guarantee",
              "On-premise deployment",
            ],
      cta: lang === "cs-cz" ? "Kontaktovat prodej" : "Contact Sales",
    },
  ]

  const plans = dict?.plans || defaultPlans

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {dict?.title || "Simple, transparent pricing"}
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            {dict?.subtitle ||
              "Choose the perfect plan for your parking management needs. All plans include a 14-day free trial."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20 scale-105"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href={`/${lang}/dashboard`}>
                  <Button
                    className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">All plans include 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  )
}
