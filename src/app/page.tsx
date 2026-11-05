import { HeroKineticCanvas } from "@/components/hero-kinetic-canvas";
import { PresentationModeStatus } from "@/components/presentation-mode-status";
import { ArrowUpRight, Mail } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  featured?: boolean;
}

const FEATURED_PROJECTS: Project[] = [
  {
    title: "Google Tasks Desktop",
    description:
      "A fast, native cross-platform desktop client for Google Tasks. Built to bring offline capability, system tray integration, and keyboard shortcuts to task management.",
    tags: ["Rust", "Tauri", "SvelteKit"],
    href: "https://github.com/shouryan01/Google-Tasks-Desktop",
    featured: true,
  },
  {
    title: "Blazor Starter Architecture",
    description:
      "A production-ready full-stack template refining developer ergonomics, component structure, and state management in enterprise .NET applications.",
    tags: ["C#", ".NET", "WebAssembly"],
    href: "https://github.com/shouryan01/BlazorServerTemplate",
  },
  {
    title: "OpenCV Gesture Game",
    description:
      "Real-time gesture recognition running in the browser with sub-millisecond pipeline latency using MediaPipe hand-tracking and computer vision.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    href: "https://github.com/shouryan01/opencv-rock-paper-scissors",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Editorial Hero with Kinetic WebGL Canvas Backdrop */}
      <section className="relative -mx-6 sm:-mx-8 px-6 sm:px-8 py-8 sm:py-14 rounded-2xl overflow-hidden transition-colors">
        <HeroKineticCanvas />

        <div className="relative space-y-6 max-w-2xl">
          <PresentationModeStatus />

          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text-primary leading-[1.12]">
              Shouryan Nikam
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-text-secondary italic">
              Software engineer crafting native systems, developer tools, and thoughtful digital
              interfaces.
            </p>
          </div>

          <p className="text-base text-text-secondary leading-relaxed font-sans">
            Currently engineering high-speed measurement systems and instrumentation software at{" "}
            <span className="text-text-primary font-medium">Tektronix</span>. University of Michigan
            computer science alumnus interested in systems programming, performance engineering, and
            interface design.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="mailto:snnikam@umich.edu"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Get in touch</span>
            </a>

            <a
              href="https://github.com/shouryan01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-surface-elevated text-text-primary text-xs font-medium hover:border-border-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-text-tertiary" aria-hidden="true" />
            </a>

            <a
              href="https://www.linkedin.com/in/shouryannikam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-surface-elevated text-text-primary text-xs font-medium hover:border-border-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-text-tertiary" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl tracking-tight text-text-primary">Selected Work</h2>
          <a
            href="https://github.com/shouryan01"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-mono text-xs text-text-tertiary hover:text-text-primary transition-colors"
          >
            <span>All repositories</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`kinetic-card group p-5 rounded-xl border border-border bg-surface-elevated flex flex-col justify-between transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                project.featured ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg tracking-tight text-text-primary group-hover:text-text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-surface-muted text-text-secondary border border-border/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Experience & Background */}
      <section className="space-y-6 pt-6 border-t border-border">
        <h2 className="font-serif text-2xl tracking-tight text-text-primary">
          Background & Experience
        </h2>

        <div className="space-y-4">
          <div className="kinetic-card p-5 rounded-xl border border-border bg-surface-elevated transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-semibold text-text-primary">Software Engineer</h3>
                <span className="text-text-tertiary">•</span>
                <span className="text-text-secondary font-medium">Tektronix</span>
              </div>
              <span className="font-mono text-xs text-text-tertiary">Current</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-sans">
              Building high-speed instrumentation software, native data processing pipelines, and
              test automation architecture for advanced test and measurement applications.
            </p>
          </div>

          <div className="kinetic-card p-5 rounded-xl border border-border bg-surface-elevated transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-semibold text-text-primary">
                  B.S. in Computer Science
                </h3>
                <span className="text-text-tertiary">•</span>
                <span className="text-text-secondary font-medium">University of Michigan</span>
              </div>
              <span className="font-mono text-xs text-text-tertiary">Alumnus</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-sans">
              Studied computer systems, algorithms, and software engineering. Active interest in
              boxing, digital media, and open-source software tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
