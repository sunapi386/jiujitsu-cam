import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jiujitsu.cam",
      lastModified: new Date(),
    },
    {
      url: "https://jiujitsu.cam/demo",
      lastModified: new Date(),
    },
  ];
}
