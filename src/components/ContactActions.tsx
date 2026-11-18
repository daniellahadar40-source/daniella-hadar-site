import Button from "@/components/ui/Button";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";

type ContactActionsProps = {
  phone?: string;
  email?: string;
  showValues?: boolean;
  centered?: boolean;
  className?: string;
};

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
