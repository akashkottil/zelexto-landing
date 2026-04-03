import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#F5F5F5] tracking-tight">
              zel<span className="text-[#ff6b6b]">exto</span>
            </span>
            <p className="text-[#666] text-sm mt-4 leading-relaxed max-w-xs">
              Your AI-powered digital agency. We build startups, MVPs, and
              e-commerce brands with speed and precision.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] text-[#888] font-medium mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#666] text-sm hover:text-[#F5F5F5] transition-colors duration-300"
                    data-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] text-[#888] font-medium mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[#666] text-sm">
                <Phone size={14} className="text-[#ff6b6b]" />
                <a href="tel:+918590090380" className="hover:text-[#F5F5F5] transition-colors" data-hover>
                  +91 8590090380
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#666] text-sm">
                <Mail size={14} className="text-[#ff6b6b]" />
                <a href="mailto:zelexto@gmail.com" className="hover:text-[#F5F5F5] transition-colors" data-hover>
                  zelexto@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#666] text-sm">
                <MapPin size={14} className="text-[#ff6b6b] mt-0.5" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#444] text-xs">
            &copy; {new Date().getFullYear()} Zelexto. All rights reserved.
          </p>
          <p className="text-[#333] text-xs">
            Designed & built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
