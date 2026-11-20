import Button from "@/components/ui/Button";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

type ContactActionsProps = {
  phone?: string;
  email?: string;
  showValues?: boolean;
  centered?: boolean;
  className?: string;
};

// הופכת מספר טלפון ישראלי (050-1234567) לפורמט בינלאומי הנדרש ע"י wa.me
// (9725XXXXXXXX), לפי בקשת דניאלה שהפנייה הראשונה תתבצע בוואטסאפ.
function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `972${digits.slice(1)}` : digits;
}

export default function ContactActions({
  phone,
  email,
  showValues = false,
  centered = false,
  className,
}: ContactActionsProps) {
  if (!phone && !email) return null;

  const classes = [
    "flex flex-wrap gap-3",
    centered ? "justify-center" : "justify-start",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="group" aria-label="אפשרויות יצירת קשר ישירות">
      {phone && (
        <Button
          href={`https://wa.me/${toWhatsAppNumber(phone)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-40 gap-2"
          aria-label={showValues ? `פנייה בוואטסאפ אל ${phone}` : "פנייה לדניאלה בוואטסאפ"}
        >
          <WhatsAppIcon width={19} height={19} aria-hidden="true" />
          <span className="flex min-w-0 flex-wrap items-center gap-x-2">
            <span>שלחו וואטסאפ</span>
            {showValues && <span className="font-normal" dir="ltr">{phone}</span>}
          </span>
        </Button>
      )}
      {phone && (
        <Button
          href={`tel:${phone}`}
          variant="secondary"
          className="min-w-40 gap-2 bg-white/70"
          aria-label={showValues ? `התקשרות אל ${phone}` : "התקשרות לדניאלה"}
        >
          <PhoneIcon width={19} height={19} aria-hidden="true" />
          <span className="flex min-w-0 flex-wrap items-center gap-x-2">
            <span>התקשרו</span>
            {showValues && <span className="font-normal" dir="ltr">{phone}</span>}
          </span>
        </Button>
      )}
      {email && (
        <Button
          href={`mailto:${email}`}
          variant="secondary"
          className="min-w-40 gap-2 bg-white/70"
          aria-label={showValues ? `שליחת מייל אל ${email}` : "שליחת מייל לדניאלה"}
        >
          <MailIcon width={19} height={19} aria-hidden="true" />
          <span className="flex min-w-0 flex-wrap items-center gap-x-2">
            <span>שלחו מייל</span>
            {showValues && <span className="break-all font-normal" dir="ltr">{email}</span>}
          </span>
        </Button>
      )}
    </div>
  );
}
