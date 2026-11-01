import type { ReactNode } from "react";

// lucide-react 1.x dropped brand icons; these are its former outline glyphs (ISC) so they sit with the rest.
const icon = (children: ReactNode) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zelexto.studio/",
    icon: icon(
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>,
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/105013069/",
    icon: icon(
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>,
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Zelexto-Studio/61589581725824/",
    icon: icon(<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />),
  },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Zelexto Studio on ${s.label}`}
            title={s.label}
            className="w-10 h-10 rounded-full border border-canvas/10 flex items-center justify-center text-graphite-soft hover:text-ink hover:bg-canvas hover:border-canvas transition-colors duration-300"
          >
            {s.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
