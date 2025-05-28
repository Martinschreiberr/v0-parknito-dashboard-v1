import { Star, Quote, User } from "lucide-react"

interface TestimonialsProps {
  dict?: {
    title?: string
    subtitle?: string
    testimonials?: Array<{
      name: string
      role: string
      company: string
      content: string
      rating: number
      avatar?: string
    }>
  }
}

export const Testimonials = ({ dict }: TestimonialsProps) => {
  const defaultTestimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "Metro Parking Solutions",
      content:
        "ParkSmart has revolutionized our parking operations. The real-time monitoring and analytics have increased our efficiency by 40% and significantly improved customer satisfaction.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Facility Director",
      company: "Downtown Business Center",
      content:
        "The integration was seamless and the support team was exceptional. We've seen a 60% reduction in parking disputes and our revenue has increased by 25%.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      company: "Urban Developments",
      content:
        "Managing multiple parking locations used to be a nightmare. Now with ParkSmart's centralized dashboard, I can oversee everything from one place. It's been a game-changer.",
      rating: 5,
    },
  ]

  const testimonials = dict?.testimonials || defaultTestimonials

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {dict?.title || "What our customers say"}
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            {dict?.subtitle ||
              "Don't just take our word for it. Here's what parking professionals are saying about ParkSmart."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute -top-4 left-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                  <Quote className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 leading-relaxed mb-6">"{testimonial.content}"</blockquote>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
