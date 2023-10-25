import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "jiujitsu.cam - AI-Powered Movement Feedback",
  openGraph: {
    title: "jiujitsu.cam - AI-Powered Movement Feedback",
    description:
      "jiujitsu.cam is an AI-driven platform providing insights and feedback on your jiujitsu movements to refine your techniques.",
    images: [
      {
        url: "https://jiujitsu.cam/opengraph-image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "jiujitsu.cam - AI-Powered Movement Feedback",
    description:
      "jiujitsu.cam is an AI-driven platform providing insights and feedback on your jiujitsu movements to refine your techniques.",
    images: ["https://jiujitsu.cam/opengraph-image"],
    creator: "@sunapi386",
  },
  metadataBase: new URL("https://jiujitsu.cam"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
      </body>
    </html>
  );
}
