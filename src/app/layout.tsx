import type { Metadata } from "next";
import Link from "next/link";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { PresentationModeProvider } from "@/context/presentation-mode-context";
import { PeelSwitcher } from "@/components/peel-switcher";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shouryan Nikam — Design & Software Engineering",
  description:
    "Personal portfolio and digital garden of Shouryan Nikam. Built with Next.js 16, React 19, and Tailwind CSS v4.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-presentation-mode="minimal"
      className={`${sans.variable} ${newsreader.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('portfolio-presentation-mode');if(m==='kinetic'||m==='minimal'){document.documentElement.dataset.presentationMode=m;}else{document.documentElement.dataset.presentationMode='minimal';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-text-primary selection:bg-accent selection:text-accent-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PresentationModeProvider defaultMode="minimal">
            <div className="relative min-h-screen flex flex-col">
              <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                  <Link
                    href="/"
                    className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="font-serif text-lg tracking-tight text-text-primary group-hover:text-text-secondary transition-colors">
                      Shouryan Nikam
                    </span>
                    <span className="font-mono text-xs text-text-tertiary">/</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                      Portfolio
                    </span>
                  </Link>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                  </div>
                </div>
              </header>

              <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
                {children}
              </main>

              <footer className="w-full border-t border-border/70 py-8 text-xs text-text-tertiary">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-center sm:justify-end">
                  <div className="flex items-center gap-4 font-mono text-[11px]">
                    <a
                      href="https://github.com/shouryan01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="text-border">•</span>
                    <a
                      href="https://www.linkedin.com/in/shouryannikam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                    <span className="text-border">•</span>
                    <a
                      href="mailto:snnikam@umich.edu"
                      className="hover:text-text-primary transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </footer>

              {/* Bottom-Right Corner Peel Switcher */}
              <PeelSwitcher />
            </div>
          </PresentationModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
