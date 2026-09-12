import "./globals.css";

export const metadata = {
  title: "Guest List Form",
  description: "Guest registration form / 宿泊者名簿 / 住宿登记表 / 숙박자 명단 양식",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
