import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-zelexto" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5]">
              Zelexto
            </span>
            <p className="text-[#888] text-sm mt-3 leading-relaxed max-w-xs">
              Your AI-powered digital agency. We build startups, MVPs, and
              e-commerce brands with speed and precision.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#F5F5F5] font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#888] text-sm hover:text-[#F5F5F5] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5F5F5] font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[#888] text-sm">
                <Phone size={14} className="text-[#F5F5F5]" />
                <a href="tel:+918590090380" className="hover:text-[#F5F5F5] transition-colors">
                  +91 8590090380
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#888] text-sm">
                <Mail size={14} className="text-[#F5F5F5]" />
                <a href="mailto:hello@zelexto.com" className="hover:text-[#F5F5F5] transition-colors">
                  hello@zelexto.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#888] text-sm">
                <MapPin size={14} className="text-[#F5F5F5] mt-0.5" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-[#888] text-sm">
            &copy; {new Date().getFullYear()} Zelexto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
