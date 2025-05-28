import { getDictionary } from "@/lib/dictionary"
import { LandingNavbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Stats } from "@/components/landing/stats"

export default async function LandingPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar dict={dict.landing?.navbar || {}} lang={params.lang} />
      <main>
        <Hero dict={dict.landing?.hero || {}} lang={params.lang} />
        <Stats dict={dict.landing?.stats || {}} />
        <Features dict={dict.landing?.features || {}} />
        <Pricing dict={dict.landing?.pricing || {}} lang={params.lang} />
        <Testimonials dict={dict.landing?.testimonials || {}} />
        <FAQ dict={dict.landing?.faq || {}} />
        <CTA dict={dict.landing?.cta || {}} lang={params.lang} />
      </main>
      <Footer dict={dict.landing?.footer || {}} lang={params.lang} />
    </div>
  )
}
