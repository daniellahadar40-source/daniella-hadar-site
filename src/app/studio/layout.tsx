// Root layout נפרד למסלול /studio (ניהול תוכן Sanity) - ללא Header/Footer/RTL
// של האתר הציבורי, כדי לא לשבור את ממשק ה-Studio. ראו הערה בתיקיית [[...tool]].
export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
