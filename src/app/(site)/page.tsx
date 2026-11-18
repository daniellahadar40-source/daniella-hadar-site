import { getArticles, getCourses, getFaqs, getServices, getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import CmsImage from "@/components/CmsImage";
import LocalPhoto from "@/components/ui/LocalPhoto";
import Button from "@/components/ui/Button";
import ContactActions from "@/components/ContactActions";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import { LaptopIcon, VideoCallIcon, HandshakeIcon, BookIcon, HeartGuideIcon, CompassIcon } from "@/components/ui/icons";
import type { ServiceType } from "@/lib/types";

const serviceIcons = {
  digital: LaptopIcon,
  zoom: VideoCallIcon,
  "in-person": HandshakeIcon,
  other: CompassIcon,
} satisfies Record<ServiceType, typeof LaptopIcon>;

export default async function HomePage() {
  const [courses, siteSettings, articles, services, faqs] = await Promise.all([
    getCourses(),
    getSiteSettings(),
    getArticles(),
    getServices(),
    getFaqs(),
  ]);

  // "מוכן לאתר" = קורס שאושר לפרסום (פעיל) או שהוכרז רשמית כ"בקרוב". קורס
  // בסטטוס "טיוטה" אינו מאושר לפרסום (שם/תוכן לא סופיים) — לכן איננו מוצג
  // כ"קורס דגל" חי, כדי לא להציג מצג שווא של משהו קיים/ניתן-לרכישה
  // (ראו כללי התוכן המחייבים: "אם שם הקורס אינו סופי... לא להמציא/להציג כחי").
  const mainCourse = courses.find((course) => course.status === "published" || course.status === "coming-soon");

  const servicesStructuredData =
    services.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": services.map((service, index) => ({
            "@type": "Service",
            "@id": `${SITE_URL.toString()}#service-${index}`,
            name: service.title,
            description: service.shortDescription,
            provider: { "@id": `${SITE_URL.toString()}#person` },
          })),
        }
      : null;

  const faqStructuredData =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      {servicesStructuredData && <JsonLd data={servicesStructuredData} />}
      {faqStructuredData && <JsonLd data={faqStructuredData} />}
      {/* ===== HERO ===== */}
      <Section className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 -start-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(227,213,190,0.55)_0%,rgba(227,213,190,0)_70%)]"
        />
        <div className="relative grid gap-14 md:grid-cols-[1fr_1.15fr] md:items-center">
          <div className="relative order-2 md:order-1">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-9 -end-9 h-[82%] w-[82%] rounded-full bg-[radial-gradient(circle,rgba(167,186,172,0.5)_0%,rgba(167,186,172,0)_72%)]"
            />
            <CmsImage
              image={siteSettings.heroImage}
              alt="מסמכי זכויות ועלה בוטני — תחום הליווי של דניאלה"
              className="relative z-10 aspect-[4/5] rounded-card shadow-lg shadow-ink/15"
              sizes="(min-width: 768px) 45vw, 100vw"
              priority
              fallback={
                <LocalPhoto
                  src="/images/hero-documents.png"
                  alt="מסמכי זכויות ועלה בוטני — תחום הליווי של דניאלה"
                  className="relative z-10 aspect-[4/5] rounded-card shadow-lg shadow-ink/15"
                  sizes="(min-width: 768px) 45vw, 100vw"
                  priority
                />
              }
            />
            <p className="relative z-10 mt-3 text-sm font-bold text-smoked-blue">
              דניאלה הדר · עובדת סוציאלית, מיצוי זכויות רפואיות
            </p>
          </div>

          <div className="order-1 md:order-2">
            <h1 className="text-display font-serif font-normal leading-tight text-ink sm:text-display-lg lg:text-display-xl">
              ידע מקצועי. ליווי אנושי.
              <br />
              יותר <span className="border-b-[3px] border-terracotta pb-0.5">בהירות</span> בדרך.
            </h1>
            <p className="mt-6 max-w-md text-body-lg text-ink/85">
              עובדת סוציאלית המלווה משפחות ויחידים מול ביטוח לאומי והוועדות
              הרפואיות — בידע מקצועי, בבהירות ובלי בירוקרטיה מיותרת.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button href="/contact">ליצירת קשר</Button>
              <Button href="/courses" variant="secondary">
                לצפייה בקורסים
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== שלושה מסלולים ===== */}
      <Section className="text-center" ariaLabelledBy="paths-title">
        <SectionLabel centered>איך לעבוד איתי</SectionLabel>
        <h2 id="paths-title" className="mt-3.5 text-h2 font-serif font-normal text-ink">
          שלושה מסלולים, קצב אחד שלכם
        </h2>
        <div className="mt-12 grid grid-cols-1 md:flex md:flex-wrap">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.serviceType] ?? CompassIcon;
            return (
              <div
              key={service.title}
              className={`flex-1 px-6 py-7 text-center md:min-w-[220px] md:px-8 md:py-0 ${
                index > 0 ? "border-t border-ink/10 md:border-t-0 md:border-s md:border-ink/10" : ""
              }`}
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                <Icon width={24} height={24} />
              </span>
              {service.label && <p className="mt-4 text-caption font-bold text-terracotta">{service.label}</p>}
              <h3 className={`${service.label ? "mt-2" : "mt-4"} text-h3 font-serif font-normal text-ink`}>
                {service.title}
              </h3>
              <p className="mx-auto mt-2.5 max-w-[260px] text-[15px] leading-relaxed text-ink/80">
                {service.shortDescription}
              </p>
            </div>
            );
          })}
        </div>
      </Section>

      {/* ===== הקורס הדיגיטלי המרכזי ===== */}
      <Section ariaLabelledBy="main-course-title">
        <div className="overflow-hidden rounded-card border border-ink/10 bg-white shadow-[0_14px_34px_rgba(41,58,67,0.08)]">
          <div className="flex flex-wrap-reverse items-stretch">
            <div className="flex-1 basis-[420px] p-8 sm:p-12">
              <span className="inline-block rounded-full bg-terracotta/15 px-4.5 py-2.5 text-[13px] font-bold text-terracotta">
                {mainCourse
                  ? mainCourse.status === "coming-soon"
                    ? "הקורס הדיגיטלי המרכזי · בקרוב"
                    : "הקורס הדיגיטלי המרכזי"
                  : "הקורס הדיגיטלי המרכזי · בהכנה"}
              </span>
              <h2 id="main-course-title" className="mt-5 text-h2 font-serif font-normal text-ink">
                {mainCourse ? mainCourse.title : "קורס דיגיטלי עצמאי בתהליכי השלמה"}
              </h2>
              <p className="mt-3.5 max-w-md text-[16px] leading-relaxed text-ink/80">
                {mainCourse
                  ? mainCourse.shortDescription
                  : "אני בתהליך בניית קורס דיגיטלי שילמד שלב-אחר-שלב איך לבדוק זכאות ולנהל את התהליך מול ביטוח לאומי והוועדות הרפואיות, בעצמכם ובקצב שלכם. שם הקורס ותוכנו המלא יפורסמו כאן רק לאחר אישור סופי."}
              </p>
              <div className="mt-6">
                {mainCourse ? (
                  <Button href={`/courses/${mainCourse.slug}`}>לפרטי הקורס</Button>
                ) : (
                  <Button href="/contact">ליצירת קשר</Button>
                )}
              </div>
            </div>

            {mainCourse ? (
              <CmsImage
                image={mainCourse.coverImage}
                alt={mainCourse.title}
                className="flex-1 basis-[320px] min-h-[280px]"
                sizes="(min-width: 768px) 420px, 100vw"
                fallback={
                  <LocalPhoto
                    src="/images/course-books.png"
                    alt="ערימת ספרים המסמלת ידע ולמידה מובנית"
                    className="flex-1 basis-[320px] min-h-[280px]"
                    sizes="(min-width: 768px) 420px, 100vw"
                  />
                }
              />
            ) : (
              <LocalPhoto
                src="/images/course-books.png"
                alt="ערימת ספרים המסמלת ידע ולמידה מובנית"
                className="flex-1 basis-[320px] min-h-[280px]"
                sizes="(min-width: 768px) 420px, 100vw"
              />
            )}
          </div>
        </div>
      </Section>

      {/* ===== מי אני ===== */}
      <Section ariaLabelledBy="about-preview-title">
        <div className="mx-auto max-w-[460px] text-center md:text-start">
          <SectionLabel>מי אני</SectionLabel>
          <h2 id="about-preview-title" className="mt-2.5 text-h2 font-serif font-normal text-ink">
            עובדת מהשטח, לא רק מהספר
          </h2>
          <p className="mt-4 text-body-lg text-ink/85">
            אני דניאלה הדר, עובדת סוציאלית העוסקת במיצוי זכויות רפואיות ונפשיות.
            לאורך שנות עבודתי במערכות הציבוריות ליוויתי אנשים ומשפחות בתהליכים
            מורכבים מול ביטוח לאומי והוועדות הרפואיות.
          </p>
          <div className="mt-5">
            <Button href="/about" variant="ghost">
              לקריאת הסיפור המלא ←
            </Button>
          </div>
        </div>
      </Section>

      {/* ===== מרכז הידע ===== */}
      <section className="bg-sage/[0.16] py-20 sm:py-24" aria-labelledby="knowledge-preview-title">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <SectionLabel centered>מרכז הידע</SectionLabel>
          <h2 id="knowledge-preview-title" className="mt-3.5 text-h2 font-serif font-normal text-ink">
            מאמרים מקצועיים, בלי ז&apos;רגון
          </h2>

          {articles.length === 0 ? (
            <div className="mx-auto mt-10 max-w-xl rounded-card bg-white p-9 sm:p-11">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                <BookIcon width={24} height={24} />
              </span>
              <p className="mt-4 text-[17px] font-bold text-ink">מרכז הידע בבנייה</p>
              <p className="mt-2.5 text-ink/80">
                אני עובדת על המאמרים המקצועיים הראשונים, שיעלו כאן ברגע שיהיו
                מוכנים — בלי ז&apos;רגון, עם מקורות מאומתים.
              </p>
              <ContactActions
                phone={siteSettings.phone}
                email={siteSettings.email}
                centered
                className="mt-5"
              />
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-6 text-start sm:grid-cols-3">
                {articles.slice(0, 3).map((article) => (
                  <Card key={article.slug}>
                    <CmsImage image={article.coverImage} alt={article.title} className="mb-4 aspect-[4/3] rounded-card" />
                    <h3 className="text-h3 font-serif font-normal text-ink">{article.title}</h3>
                    <p className="mt-2 text-ink/80">{article.excerpt}</p>
                    <Button href={`/knowledge/${article.slug}`} variant="ghost" className="mt-4 inline-block">
                      לקריאת המאמר ←
                    </Button>
                  </Card>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/knowledge" variant="ghost">
                  לכל המאמרים ←
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {faqs.length > 0 && (
        <Section ariaLabelledBy="faq-title">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-title" className="text-center text-h2 font-serif font-normal text-ink">
              שאלות נפוצות
            </h2>
            <div className="mt-9 divide-y divide-ink/10 border-y border-ink/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-semibold text-ink marker:content-none">
                    <span>{faq.question}</span>
                    <span aria-hidden="true" className="text-2xl font-light text-smoked-blue transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-[70ch] pb-5 leading-relaxed text-ink/80">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ===== יצירת קשר ===== */}
      <Section tone="blue" ariaLabelledBy="contact-title">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-cream">
            <HeartGuideIcon width={22} height={22} />
          </span>
          <h2 id="contact-title" className="mt-4 text-h2 font-serif font-normal">
            רוצה לשמוע עוד?
          </h2>
          <p className="mt-3 text-cream/85">אפשר ליצור קשר ישירות בכל שאלה או לקבלת פרטים נוספים.</p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" variant="inverse">
              ליצירת קשר
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
