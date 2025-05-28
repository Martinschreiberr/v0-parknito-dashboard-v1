import Link from "next/link"

interface FooterProps {
  dict?: {
    company?: {
      title?: string
      about?: string
      careers?: string
      contact?: string
    }
    product?: {
      title?: string
      features?: string
      pricing?: string
      api?: string
    }
    legal?: {
      title?: string
      privacy?: string
      terms?: string
      cookies?: string
    }
    copyright?: string
  }
  lang?: string
}

export const Footer = ({ dict, lang }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>{dict?.company?.title || "Company"}</h3>
          <Link href={`/${lang}/about`}>{dict?.company?.about || "About"}</Link>
          <Link href={`/${lang}/careers`}>{dict?.company?.careers || "Careers"}</Link>
          <Link href={`/${lang}/contact`}>{dict?.company?.contact || "Contact"}</Link>
        </div>
        <div className="footer-section">
          <h3>{dict?.product?.title || "Product"}</h3>
          <Link href={`/${lang}/features`}>{dict?.product?.features || "Features"}</Link>
          <Link href={`/${lang}/pricing`}>{dict?.product?.pricing || "Pricing"}</Link>
          <Link href={`/${lang}/api`}>{dict?.product?.api || "API"}</Link>
        </div>
        <div className="footer-section">
          <h3>{dict?.legal?.title || "Legal"}</h3>
          <Link href={`/${lang}/privacy`}>{dict?.legal?.privacy || "Privacy Policy"}</Link>
          <Link href={`/${lang}/terms`}>{dict?.legal?.terms || "Terms of Service"}</Link>
          <Link href={`/${lang}/cookies`}>{dict?.legal?.cookies || "Cookie Policy"}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{dict?.copyright || "© 2024 ParkingApp. All rights reserved."}</p>
      </div>
    </footer>
  )
}
