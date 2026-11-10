import { getArticles, getCourses, getSiteSettings, getTestimonials } from "@/lib/data";
import CmsImage from "@/components/CmsImage";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

// שלושת מסלולי הליווי כפי שסוכמו בתוכנית העבודה (סעיף 10) — דיגיטלי עצמאי
// הוא תמיד המסלול המודגש ביותר מבחינה חזותית באתר.
const consultationPaths = [
  {
    label: "מסלול 1",
    title: "קורס דיגיטלי עצמאי",
    description:
      "לומדים בקצב אישי, מתי שנוח, בליווי חומר כתוב וברור — נקודת ההתחלה המומלצת לרוב המשפחות.",
  },
  {
    label: "מסלול 2",
    title: "ייעוץ אישי בזום",
    description: "פגישת ייעוץ אחד-על-אחד מכל מקום בארץ, להתמקדות במצב הספציפי שלכם.",
  },
  {
    label: "מסלול 3",
    title: "פגישה פרונטלית",
    description: "פגישה פנים אל פנים בתיאום מראש, בהתאם לזמינות ולאזור השירות.",
  },
];

export default async function HomePage() {
  const [courses, siteSettings, articles, testimonials] = await Promise.all([
    getCourses(),
    getSiteSettings(),
    getArticles(),
    getTestimonials(),
  ]);
  const mainCourse = courses.find((course) => course.status !== "hidden");

  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>עובדת סוציאלית · מיצוי זכויות רפואיות</SectionLabel>
            <h1 className="mt-4 text-display font-bold leading-tight text-ink sm:text-display-lg">
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
          <CmsImage image={siteSettings.heroImage} alt="דניאלה הדר" className="aspect-[4/5] rounded-card" priority />
        </div>
      </Section>

      <Section tone="champagne" ariaLabelledBy="paths-title">
        <SectionLabel>איך לעבוד איתי</SectionLabel>
        <h2 id="paths-title" className="mt-3 text-h2 font-bold text-ink">
          שלושה מסלולים, קצב אחד שלכם
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {consultationPaths.map((path) => (
            <div key={path.title} className="rounded-card bg-cream/70 p-6">
              <p className="text-caption font-semibold tracking-wide text-smoked-blue">{path.label}</p>
              <h3 className="mt-3 text-h3 font-bold text-ink">{path.title}</h3>
              <p className="mt-2 text-ink/80">{path.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {mainCourse && (
        <Section ariaLabelledBy="main-course-title">
          <SectionLabel>הקורס הדיגיטלי המרכזי</SectionLabel>
          <div className="mt-6 grid gap-10 rounded-card border border-sage/40 bg-white/70 p-8 sm:p-10 md:grid-cols-2 md:items-center">
            <CmsImage image={mainCourse.coverImage} alt={mainCourse.title} className="aspect-[4/3] rounded-card" />
            <div>
              <h2 id="main-course-title" className="text-h2 font-bold text-ink">
                {mainCourse.title}
              </h2>
              <p className="mt-3 text-ink/80">{mainCourse.shortDescription}</p>
              <div className="mt-6">
                <Button href={`/courses/${mainCourse.slug}`}>לפרטי הקורס</Button>
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section tone="sage" ariaLabelledBy="about-preview-title">
        <div className="max-w-2xl">
          <SectionLabel>מי אני</SectionLabel>
          <h2 id="about-preview-title" className="mt-3 text-h2 font-bold text-ink">
            עובדת מהשטח, לא רק מהספר
          </h2>
          <p className="mt-4 text-ink/80">
            עבדתי שנים רבות כעובדת סוציאלית בתוך המערכות הציבוריות, ומכירה את
            התהליך מבפנים. הקורסים והליווי שאני מציעה נולדו מתוך רצון להנגיש
            את הידע הזה למשפחות שמתמודדות עם מצב רפואי מאתגר.
          </p>
          <div className="mt-5">
            <Button href="/about" variant="ghost">
              לקרוא את הסיפור המלא ←
            </Button>
          </div>
        </div>
      </Section>

      <Section ariaLabelledBy="knowledge-preview-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>מרכז הידע</SectionLabel>
            <h2 id="knowledge-preview-title" className="mt-3 text-h2 font-bold text-ink">
              מאמרים מקצועיים, בלי ז&apos;רגון
            </h2>
          </div>
          <Button href="/knowledge" variant="ghost">
            לכל המאמרים ←
          </Button>
        </div>

        {articles.length === 0 ? (
          <div className="mt-10">
            <EmptyState title="מרכז הידע בבנייה" description="המאמרים הראשונים יפורסמו כאן בקרוב." />
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

      <Section tone="champagne" ariaLabelledBy="testimonials-preview-title">
        <SectionLabel>מה אומרים</SectionLabel>
        <h2 id="testimonials-preview-title" className="mt-3 text-h2 font-bold text-ink">
          ממליצות וממליצים
        </h2>

        {testimonials.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="ההמלצות בדרך"
              description="המלצות מאומתות יפורסמו כאן בקרוב, לאחר אישור מפורש מכל ממליצה וממליץ."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card key={`${testimonial.displayName}-${index}`}>
                <p className="text-ink/90">&rdquo;{testimonial.quote}&ldquo;</p>
                <p className="mt-4 font-semibold text-smoked-blue">{testimonial.displayName}</p>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section tone="blue" ariaLabelledBy="contact-title">
        <div className="mx-auto max-w-xl text-center">
          <h2 id="contact-title" className="text-h2 font-bold">
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
