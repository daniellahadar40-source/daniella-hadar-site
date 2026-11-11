import { getArticles, getCourses, getSiteSettings, getTestimonials } from "@/lib/data";
import CmsImage from "@/components/CmsImage";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import AbstractArt from "@/components/ui/AbstractArt";
import { LaptopIcon, VideoCallIcon, HandshakeIcon, BookIcon, HeartGuideIcon } from "@/components/ui/icons";

// שלושת מסלולי הליווי כפי שסוכמו בתוכנית העבודה (סעיף 10) — דיגיטלי עצמאי
// הוא תמיד המסלול המודגש ביותר מבחינה חזותית באתר.
const consultationPaths = [
  {
    label: "מסלול 1 · נקודת ההתחלה המומלצת",
    title: "קורס דיגיטלי עצמאי",
    description:
      "לומדים בקצב אישי, מתי שנוח, בליווי חומר כתוב וברור — נקודת ההתחלה המומלצת לרוב המשפחות.",
    Icon: LaptopIcon,
    tone: "blue" as const,
  },
  {
    label: "מסלול 2",
    title: "ייעוץ אישי בזום",
    description: "פגישת ייעוץ אחד-על-אחד מכל מקום בארץ, להתמקדות במצב הספציפי שלכם.",
    Icon: VideoCallIcon,
    tone: "sage" as const,
  },
  {
    label: "מסלול 3",
    title: "פגישה פרונטלית",
    description: "פגישה פנים אל פנים בתיאום מראש, בהתאם לזמינות ולאזור השירות.",
    Icon: HandshakeIcon,
    tone: "champagne" as const,
  },
];

const pathTone = {
  blue: { chip: "bg-smoked-blue text-cream", card: "border-smoked-blue/30 bg-smoked-blue/[0.06]" },
  sage: { chip: "bg-sage text-ink", card: "border-sage/50 bg-sage/10" },
  champagne: { chip: "bg-champagne text-ink", card: "border-champagne/70 bg-champagne/20" },
};

export default async function HomePage() {
  const [courses, siteSettings, articles, testimonials] = await Promise.all([
    getCourses(),
    getSiteSettings(),
    getArticles(),
    getTestimonials(),
  ]);

  // "מוכן לאתר" = קורס שאושר לפרסום (פעיל) או שהוכרז רשמית כ"בקרוב". קורס
  // בסטטוס "טיוטה" אינו מאושר לפרסום (שם/תוכן לא סופיים) — לכן איננו מוצג
  // כ"קורס דגל" חי, כדי לא להציג מצג שווא של משהו קיים/ניתן-לרכישה
  // (ראו כללי התוכן המחייבים: "אם שם הקורס אינו סופי... לא להמציא/להציג כחי").
  const mainCourse = courses.find((course) => course.status === "published" || course.status === "coming-soon");

  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div>
            <SectionLabel>עובדת סוציאלית · מיצוי זכויות רפואיות</SectionLabel>
            <h1 className="mt-4 text-display font-bold leading-tight text-ink sm:text-display-lg lg:text-display-xl">
              ידע מקצועי. ליווי אנושי.
              <br />
              יותר בהירות בדרך.
            </h1>
            <p className="mt-5 max-w-lg text-body-lg text-ink/80">
              עובדת סוציאלית המלווה משפחות ויחידים מול ביטוח לאומי והוועדות
              הרפואיות — בידע מקצועי, בבהירות ובלי בירוקרטיה מיותרת.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/courses">לצפייה בקורסים</Button>
              <Button href="/about" variant="secondary">
                להכיר את דניאלה
              </Button>
            </div>
          </div>
          <CmsImage
            image={siteSettings.heroImage}
            alt="דניאלה הדר"
            className="aspect-[4/5] rounded-card shadow-lg shadow-ink/10"
            priority
            fallback={<AbstractArt variant="hero" className="aspect-[4/5] rounded-card shadow-lg shadow-ink/10" />}
          />
        </div>
      </Section>

      {/* ===== שלושה מסלולים ===== */}
      <Section tone="champagne" ariaLabelledBy="paths-title">
        <SectionLabel>איך לעבוד איתי</SectionLabel>
        <h2 id="paths-title" className="mt-3 text-h2 font-bold text-ink">
          שלושה מסלולים, קצב אחד שלכם
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {consultationPaths.map(({ Icon, tone, ...path }) => (
            <div key={path.title} className={`rounded-card border p-6 transition hover:-translate-y-1 hover:shadow-md hover:shadow-ink/10 ${pathTone[tone].card}`}>
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${pathTone[tone].chip}`}>
                <Icon width={24} height={24} />
              </span>
              <p className="mt-4 text-caption font-semibold tracking-wide text-smoked-blue">{path.label}</p>
              <h3 className="mt-2 text-h3 font-bold text-ink">{path.title}</h3>
              <p className="mt-2 text-ink/80">{path.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== הקורס הדיגיטלי המרכזי ===== */}
      {mainCourse ? (
        <Section ariaLabelledBy="main-course-title">
          <div className="overflow-hidden rounded-card bg-gradient-to-br from-smoked-blue to-[#2b4556] p-8 text-cream sm:p-10">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="flex items-center gap-2 text-caption font-semibold tracking-wide text-cream/90">
                  <span className="h-px w-6 bg-cream/50" aria-hidden="true" />
                  {mainCourse.status === "coming-soon" ? "הקורס הדיגיטלי המרכזי · בקרוב" : "הקורס הדיגיטלי המרכזי"}
                </p>
                <h2 id="main-course-title" className="mt-3 text-h2 font-bold text-cream">
                  {mainCourse.title}
                </h2>
                <p className="mt-3 text-cream/85">{mainCourse.shortDescription}</p>
                <div className="mt-6">
                  <Button href={`/courses/${mainCourse.slug}`} variant="inverse">
                    לפרטי הקורס
                  </Button>
                </div>
              </div>
              <CmsImage
                image={mainCourse.coverImage}
                alt={mainCourse.title}
                className="aspect-[4/3] rounded-card"
                fallback={<AbstractArt variant="course" className="aspect-[4/3] rounded-card" />}
              />
            </div>
          </div>
        </Section>
      ) : (
        <Section ariaLabelledBy="main-course-title">
          <div className="overflow-hidden rounded-card border border-smoked-blue/20 bg-gradient-to-br from-smoked-blue to-[#2b4556] p-8 text-cream sm:p-10">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="flex items-center gap-2 text-caption font-semibold tracking-wide text-cream/90">
                  <span className="h-px w-6 bg-cream/50" aria-hidden="true" />
                  הקורס הדיגיטלי המרכזי · בהכנה
                </p>
                <h2 id="main-course-title" className="mt-3 text-h2 font-bold text-cream">
                  קורס דיגיטלי עצמאי בתהליכי השלמה
                </h2>
                <p className="mt-3 max-w-md text-cream/85">
                  אני בתהליך בניית קורס דיגיטלי שילמד שלב-אחר-שלב איך לבדוק זכאות
                  ולנהל את התהליך מול ביטוח לאומי והוועדות הרפואיות, בעצמכם ובקצב
                  שלכם. שם הקורס ותוכנו המלא יפורסמו כאן רק לאחר אישור סופי.
                </p>
                <div className="mt-6">
                  <Button href="/contact" variant="inverse">
                    רוצים לדעת כשהקורס יעלה? דברו איתי
                  </Button>
                </div>
              </div>
              <AbstractArt variant="course" className="aspect-[4/3] rounded-card" />
            </div>
          </div>
        </Section>
      )}

      {/* ===== מי אני ===== */}
      <Section tone="sage" ariaLabelledBy="about-preview-title">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
          <AbstractArt variant="about" className="order-2 aspect-[4/3] rounded-card md:order-1" />
          <div className="order-1 md:order-2">
            <SectionLabel>מי אני</SectionLabel>
            <h2 id="about-preview-title" className="mt-3 text-h2 font-bold text-ink">
              עובדת מהשטח, לא רק מהספר
            </h2>
            <p className="mt-4 border-r-2 border-smoked-blue/40 pr-4 text-body-lg text-ink/85">
              אני דניאלה הדר, עובדת סוציאלית העוסקת במיצוי זכויות רפואיות ונפשיות.
              לאורך שנות עבודתי במערכות הציבוריות ליוויתי אנשים ומשפחות בתהליכים
              מורכבים מול ביטוח לאומי והוועדות הרפואיות.
            </p>
            <div className="mt-5">
              <Button href="/about" variant="ghost">
                לקרוא את הסיפור המלא ←
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== מרכז הידע ===== */}
      <Section ariaLabelledBy="knowledge-preview-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>מרכז הידע</SectionLabel>
            <h2 id="knowledge-preview-title" className="mt-3 text-h2 font-bold text-ink">
              מאמרים מקצועיים, בלי ז&apos;רגון
            </h2>
          </div>
          {articles.length > 0 && (
            <Button href="/knowledge" variant="ghost">
              לכל המאמרים ←
            </Button>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="mt-10 grid gap-8 rounded-card border border-sage/40 bg-white/60 p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-champagne/60 text-smoked-blue">
              <BookIcon width={26} height={26} />
            </span>
            <div>
              <p className="text-h3 font-bold text-ink">מרכז הידע בבנייה</p>
              <p className="mt-2 max-w-xl text-ink/75">
                אני עובדת על המאמרים המקצועיים הראשונים, שיעלו כאן ברגע שיהיו
                מוכנים — בלי ז&apos;רגון, עם מקורות מאומתים. מי שרוצה לדעת כשהם
                עולים מוזמנת/ה ליצור קשר.
              </p>
              <Button href="/contact" variant="ghost" className="mt-4 inline-block">
                עדכנו אותי כשיתפרסם מאמר ←
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <Card key={article.slug}>
                <CmsImage image={article.coverImage} alt={article.title} className="mb-4 aspect-[4/3] rounded-card" />
                <h3 className="text-h3 font-bold text-ink">{article.title}</h3>
                <p className="mt-2 text-ink/80">{article.excerpt}</p>
                <Button href={`/knowledge/${article.slug}`} variant="ghost" className="mt-4 inline-block">
                  לקריאת המאמר ←
                </Button>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* ===== המלצות — רק אם קיימות המלצות מאומתות, אחרת לא מוצג כלל ===== */}
      {testimonials.length > 0 && (
        <Section tone="champagne" ariaLabelledBy="testimonials-preview-title">
          <SectionLabel>מה אומרים</SectionLabel>
          <h2 id="testimonials-preview-title" className="mt-3 text-h2 font-bold text-ink">
            ממליצות וממליצים
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card key={`${testimonial.displayName}-${index}`}>
                <p className="text-ink/90">&rdquo;{testimonial.quote}&ldquo;</p>
                <p className="mt-4 font-semibold text-smoked-blue">{testimonial.displayName}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* ===== יצירת קשר ===== */}
      <Section tone="blue" ariaLabelledBy="contact-title">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-cream">
            <HeartGuideIcon width={22} height={22} />
          </span>
          <h2 id="contact-title" className="mt-4 text-h2 font-bold">
            רוצה לשמוע עוד?
          </h2>
          <p className="mt-3 text-cream/85">אפשר ליצור קשר ישירות או להצטרף לרשימת העדכונים.</p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" variant="inverse">
              יצירת קשר
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
