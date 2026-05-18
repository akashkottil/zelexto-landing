import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#portfolio" },
  { label: "Cafe", href: "/cafe" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-canvas/[0.06] py-16 px-6 bg-ink-deep/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Logo variant="wordmark" size="md" />
            <p className="text-graphite-soft text-sm mt-5 leading-relaxed max-w-xs">
              A digital studio crafting premium websites, mobile apps, and brand
              systems.
            </p>
            <p className="micro-label mt-4">Est · MMXXVI · Kochi</p>
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
                <Phone size={14} className="text-violet-soft" />
                <a
                  href="tel:+918590090380"
                  className="hover:text-canvas transition-colors"
                >
                  +91 8590090380
                </a>
              </li>
              <li className="flex items-center gap-3 text-graphite-soft text-sm">
                <Mail size={14} className="text-violet-soft" />
                <a
                  href="mailto:hello@zelexto.com"
                  className="hover:text-canvas transition-colors"
                >
                  hello@zelexto.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-graphite-soft text-sm">
                <MapPin size={14} className="text-violet-soft mt-0.5" />
                <span>
                  Kochi, Kerala —{" "}
                  <span className="text-graphite">09°56&apos;N · 76°15&apos;E</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="micro-label text-graphite">
            © {new Date().getFullYear()} zelexto.studio — All rights reserved.
          </p>
          <p className="micro-label text-graphite">
            Build boldly. Ship fast.
          </p>
        </div>
      </div>
    </footer>
  );
}
