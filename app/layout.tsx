import "../styles/globals.css";
import { Metadata } from "next";

const name = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "jiujitsu.cam";

export const metadata: Metadata = {
  title: `${name} - AI-Powered Movement Feedback`,
  openGraph: {
    title: `${name} - AI-Powered Movement Feedback`,
    description: `${name} is an AI-driven platform providing insights and feedback on your jiujitsu movements to refine your techniques.`,
    images: [
      {
        url: `https://${name}/opengraph-image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} - AI-Powered Movement Feedback`,
    description: `${name} is an AI-driven platform providing insights and feedback on your jiujitsu movements to refine your techniques.`,
    images: [`https://${name}/opengraph-image`],
    creator: "@sunapi386",
  },
  metadataBase: new URL(`https://${name}`),
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
