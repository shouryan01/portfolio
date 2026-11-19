import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../site.config";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() ?? "https://shouryannikam.com").replace(/\/$/, "");

  const projects = (await getCollection("projects")).sort(
    (a, b) => a.data.order - b.data.order
  );

  const writing = (await getCollection("writing"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.tagline}`,
    "",
    siteConfig.about.bio,
    "",
    "## Links",
    "",
    `- [Home](${baseUrl}/)`,
    `- [About](${baseUrl}/about)`,
    `- [Projects](${baseUrl}/projects)`,
    `- [Writing](${baseUrl}/writing)`,
    `- [Photos](${siteConfig.links.photos})`,
    `- [GitHub](${siteConfig.links.github})`,
    `- [LinkedIn](${siteConfig.links.linkedin})`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) => `- [${p.data.title}](${baseUrl}/projects/${p.id}) (${p.data.year}): ${p.data.desc}`
    ),
    "",
    "## Writing",
    "",
    ...writing.map((post) => {
      const isoDate = post.data.date.toISOString().slice(0, 10);
      return `- [${post.data.title}](${baseUrl}/writing/${post.id}) (${isoDate}): ${post.data.excerpt}`;
    }),
    ""
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
