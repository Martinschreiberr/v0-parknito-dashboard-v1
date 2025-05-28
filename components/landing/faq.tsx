"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQProps {
  dict?: {
    title?: string
    subtitle?: string
    faqs?: Array<{
      question: string
      answer: string
    }>
  }
}

export const FAQ = ({ dict }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const defaultFAQs = [
    {
      question: "How quickly can I get started with ParkSmart?",
      answer:
        "You can get started immediately with our 14-day free trial. Setup typically takes less than 30 minutes, and our onboarding team will guide you through the process.",
    },
    {
      question: "Do you support multiple payment methods?",
      answer:
        "Yes, we support all major payment methods including credit cards, mobile payments, and digital wallets. We also integrate with popular payment processors.",
    },
    {
      question: "Can I manage multiple parking locations?",
      answer:
        "Our platform is designed to handle multiple locations from a single dashboard. You can manage unlimited locations with our Professional and Enterprise plans.",
    },
    {
      question: "Is there a mobile app for users?",
      answer:
        "Yes, we provide mobile apps for both iOS and Android. Users can find parking, make reservations, and handle payments directly from their mobile devices.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We offer email support for all plans, priority support for Professional plans, and 24/7 dedicated support for Enterprise customers. We also provide comprehensive documentation and training materials.",
    },
    {
      question: "Can I integrate ParkSmart with my existing systems?",
      answer:
        "Yes, we offer API access and custom integrations. Our team can help you integrate with existing property management systems, access control systems, and other business tools.",
    },
  ]

  const faqs = dict?.faqs || defaultFAQs

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {dict?.title || "Frequently asked questions"}
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            {dict?.subtitle ||
              "Everything you need to know about ParkSmart. Can't find the answer you're looking for? Contact our support team."}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
