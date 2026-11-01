import { Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Cafe", href: "/cafe" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-canvas/[0.08] py-16 px-6 bg-ink">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Logo variant="wordmark" size="md" />
            <p className="text-graphite-soft text-sm mt-5 leading-relaxed max-w-xs">
              A digital studio crafting premium websites, mobile apps, and brand
              systems.
            </p>
            <p className="micro-label mt-4">Est · MMXXVI · Working worldwide</p>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <h4 className="micro-label mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-graphite-soft text-sm hover:text-canvas transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="micro-label mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-graphite-soft text-sm">
                <Phone size={14} className="text-graphite" />
                <a
                  href="tel:+918590090380"
                  className="hover:text-canvas transition-colors"
                >
                  +91 8590090380
                </a>
              </li>
              <li className="flex items-center gap-3 text-graphite-soft text-sm">
                <Mail size={14} className="text-graphite" />
                <a
                  href="mailto:hello@zelexto.com"
                  className="hover:text-canvas transition-colors"
                >
                  hello@zelexto.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="micro-label text-graphite">
            © {new Date().getFullYear()} zelexto.com — All rights reserved.
          </p>
          <p className="micro-label text-graphite">
            Build boldly. Ship fast.
          </p>
        </div>
      </div>
    </footer>
  );
}
