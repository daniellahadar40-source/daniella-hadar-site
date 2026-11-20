import type { SVGProps } from "react";

// סט אייקונים מצומצם בקו אחיד (stroke, currentColor) למסלולי הליווי ולאזורי
// תוכן שונים באתר. נבחר להימנע מתלות חדשה (לוגו-ספריית אייקונים) ולהישאר עם
// SVG מוטבע פשוט, כך שגודל החבילה (bundle) לא גדל (ראו דרישות הנגישות/ביצועים).

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LaptopIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="11" rx="1.4" />
      <path d="M2 18.5h20" />
      <path d="M9.5 8.5h5" />
    </svg>
  );
}

export function VideoCallIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3" y="6.5" width="12.5" height="11" rx="1.6" />
      <path d="M15.5 10.2 21 7.5v9l-5.5-2.7" />
      <circle cx="9.2" cy="10.5" r="1.6" />
      <path d="M6.3 15.2c.6-1.5 1.8-2.3 2.9-2.3s2.3.8 2.9 2.3" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3 11.5 7 8l3 1.7" />
      <path d="M21 11.5 17 8l-3 1.7" />
      <path d="M10 9.7l2 1.3 2-1.3" />
      <path d="M7 8v5.2l3.2 2.3c.7.5 1.7.5 2.4-.1l.2-.2" />
      <path d="M17 8v5.2l-3.2 2.3" />
      <path d="M3 11.5v4.2M21 11.5v4.2" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 5.2c2-1 5-1 8 .3 3-1.3 6-1.3 8-.3v13.6c-2-1-5-1-8 .3-3-1.3-6-1.3-8-.3Z" />
      <path d="M12 5.5v13.6" />
    </svg>
  );
}

export function HeartGuideIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 19s-7.2-4.4-9.5-8.8C1 7 2.6 4 5.8 4c1.9 0 3.3 1 4.2 2.4C11 5 12.4 4 14.2 4c3.2 0 4.8 3 3.3 6.2C15.2 14.6 12 19 12 19Z" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.6" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 20l1.3-4.2A8 8 0 1 1 8.5 19L4 20Z" />
      <path d="M9 10.3c0 2.8 2.4 5.2 5.2 5.2.5 0 1-.4 1-.9v-.6c0-.4-.3-.7-.6-.8l-1.5-.4c-.3-.1-.6 0-.8.2l-.3.4a6 6 0 0 1-2.4-2.4l.4-.3c.2-.2.3-.5.2-.8l-.4-1.5c-.1-.3-.4-.6-.8-.6h-.6c-.5 0-.9.5-.9 1Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M6 3.5h3.2l1.3 4.1-2 1.8a12 12 0 0 0 5.9 5.9l1.8-2 4.1 1.3V18a2 2 0 0 1-2 2.1C11 20 3.9 13 3.9 6.5A2 2 0 0 1 6 3.5Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function AccessibilityIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="4.5" r="2" />
      <path d="M5 8.5h14M12 7v13M8 20l4-6 4 6" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4.5 5.5h15v10.8H9l-4.5 3v-3Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}
